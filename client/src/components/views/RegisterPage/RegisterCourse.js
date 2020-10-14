import React , {useState ,useEffect} from 'react'
import { Table, Button , Input ,Icon } from 'antd';
import axios from 'axios';
import Highlighter from 'react-highlight-words';



const { Search } = Input;


const RegisterCourse = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox');

    const getCourses = () => {
      setLoading(true)
      axios.get("/api/datas/course").then((response) => {
        if (response.data.success) {
          setCourses([...courses, ...response.data.courseInfo]);
          console.log(courses)
          console.log(response.data.courseInfo)
          setLoading(false)
        } else {
          alert("수업 정보를 가져오는데 실패했습니다.");
        }
      });
    };

    useEffect(() => {
      console.log("courses")
      getCourses();
      }, []);

      
      // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };

      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Search
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<Icon type='search' />}
                size="small"
                style={{ width: 90 }}
              >
                검색
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                초기화
              </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type='search' style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        // onFilterDropdownVisibleChange: visible => {
        //   if (visible) {
        //     setTimeout(() => searchInput.select(), 100);
        //   }
        // },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
      };
    
      const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')

      };
      const columns = [
        {
          title: '캠퍼스',
          dataIndex: 'campus',
          key: 'campus',
          width: '10%',
          ...getColumnSearchProps('campus')
        },
        {
          title: '전공',
          dataIndex: 'major',
          key: 'major',
          width: '20%',
          ...getColumnSearchProps('major')
        },
        {
          title: '학년',
          dataIndex: 'year',
          key: 'year',
          width: '10%',
          ...getColumnSearchProps('year')
        },
        {
          title: '수업',
          dataIndex: 'course',
          key: 'course',
          width: '30%',
          ...getColumnSearchProps('course')
        },
        {
            title: '분반',
            dataIndex: 'class',
            key: 'class',
            width: '10%',
            ...getColumnSearchProps('class')
          },
          
          {
            title: '담당교수',
            dataIndex: 'prof',
            key: 'prof',
            width: '10%',
            ...getColumnSearchProps('prof')
      
          },
      ]
      


    
      if(loading){
        return (
          <>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={courses}
            bordered={true}
            loading={true}
          />
          </>
        )
      }
      return (
        <div>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={courses}
            bordered={true}
            pagination={{ pageSize: 30 }}
            scroll={{ y: 480 }}
          />
        </div>
      );
  
}

export default RegisterCourse





