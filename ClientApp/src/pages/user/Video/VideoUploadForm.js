import React,{useState, useRef} from 'react'
import { Form, Input, Button } from 'antd';
import { Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



export const VideoUploadForm = (props) => {
    const [file, setfile] = useState()
    const { Option } = Select;
    const title = useRef('');
    const description = useRef('');
    const tags = useRef('');
    const [categories, setcategories] = useState('');
 
 
    const fileInput =(e)=>{
     let files = e.target.files;
 
      setfile(files[0])
    }
   const onSelectChange = (e) => {
      

       setcategories(e)
      };
     
    const [form] = Form.useForm();
     const submitHanlder = (e) =>{
        form.validateFields()
         .then((values) => {
           
            var entereddesc = description.current.state.value;
            var enteredTitle = title.current.state.value;
            var enteredTags = tags.current.state.value;
            
          

 
           props.onSubmit(file,entereddesc,enteredTitle,enteredTags,categories)
         

            
         })
         .catch((errorInfo) => {});
       }
    return (
        <Form autoComplete='off' onSubmitCapture={submitHanlder} form={form} layout="vertical">

            <Form.Item rules={[
                {
                    required: true,

                    message: 'Please input Title!',
                },
            ]}
                label="Title" name='title'>
                <Input ref={title} name='title' placeholder="Video Title" />

            </Form.Item>
            <Form.Item
                rules={[
                    {
                        required: true,
                        min: 6,
                        message: 'Please enter short description!',
                    },
                ]}
                label="Description"
                name='description'>
                <Input ref={description} name='description' placeholder="Description" />
            </Form.Item>

            <Form.Item
                rules={[
                    {
                        required: true,

                        message: 'Please input a file!',
                    },
                ]}
                label="File"
                name='File'>
                {/* //accept="video/mp4,video/x-m4v,video/*" */}

                <Input className='form-control' onChange={fileInput} type='file' name='File' placeholder="File" />
            </Form.Item>

            <Form.Item
                rules={[
                    {
                        required: true,

                        message: 'Please enter at least one tag!',
                    },
                ]}
                label="Tags"
                name='Tags'>
                <Input ref={tags} name='Tags' placeholder="Comma seperated Tags" />
            </Form.Item>
            <Form.Item
                rules={[
                    {
                        required: true,

                        message: 'Please select some categories',
                    },
                ]}
                label="Categories"
                name='Categories'
            >
                <Select
                    onChange={onSelectChange}
                    ref={categories}
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['HD']}

                >
                    <Option key='React22'>React</Option>
                    <Option key='Programming'>Programming</Option>
                    <Option key='TV'>TV</Option>
                    <Option key='Life'>Life</Option>
                    <Option key='Money'>Money</Option>
                </Select>

            </Form.Item>
            <Form.Item>
                <Button icon={<UploadOutlined />} loading={props.submiting} htmlType='submit' type="primary">Upload  {props.progress !== 0 && props.progress !== 100 && `${props.progress}%`} </Button>
            </Form.Item>
        </Form>
    )
}
