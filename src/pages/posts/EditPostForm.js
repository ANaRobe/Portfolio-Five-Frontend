import React, {useEffect, useRef, useState} from "react";
import {
    Form,
    Button,
    Col,
    Container,
    Image,
    Alert
} from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import cloud from "../../assets/cloud.png";
import {useHistory, useParams} from 'react-router-dom';
import {axiosReq} from "../../api/axiosDefaults";

/*
Render input fields to edit a post.
 */
function EditPostForm() {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({title: "", content: "", image: "", category: ""});
    const {title, content, image, category} = data;
    const imageInput = useRef(null);
    const {id} = useParams();


    /*
Displays in the form fields
 title,content & image saved previously in the Post
 */
    useEffect(() => {
        const onMount = async () => {
            try {
                const {data} = await axiosReq.get(`/posts/${id}/`)
                const {
                    title,
                    content,
                    image,
                    is_owner,
                    category
                } = data;
                is_owner ? setData({title, content, image, category}) : history.push('/')
            } catch (error) {}
        };
        onMount();
    }, [history, id]);

    /*
  Populate postData strings
  */
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const changeImage = (e) => {
        if (e.target.files.length) {
            URL.revokeObjectURL(image); // Clear browsers's reference to the previous
            setData({
                ...data,
                image: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            if (err.response?.status!==401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title"
                    value={title}
                    onChange={handleChange}/>
            </Form.Group>
            {
            errors?.title?.map((msg, idx) => (
                <Alert variant="warning"
                    key={idx}>
                    {msg} </Alert>
            ))
        }
            <Form.Group>
                <Form.Group>
                    <Form.Label>Category</Form.Label>

                    {
                    errors.category?.map((msg, idx) => (
                        <Alert variant="warning"
                            key={idx}>
                            {msg} </Alert>
                    ))
                }

                    <Form.Control as="select" name="category"
                        value={category}
                        onChange={handleChange}
                        aria-label="category">
                        <option>Category</option>
                        <option value="did_you_know">Did you know?</option>
                        <option value="tips_and_how_tos">Tips & How Tos</option>
                        <option value="fun_posts">Fun Posts</option>
                        <option value="recommendations">Recommendations</option>

                        <option value="other">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea"
                    rows={3}
                    name="content"
                    value={content}
                    onChange={handleChange}/>
            </Form.Group>
            {
            errors?.content?.map((msg, idx) => (
                <Alert variant="warning"
                    key={idx}>
                    {msg} </Alert>
            ))
        } </div>
    );
    const imageField = (
        <div>
            <Form.Group className="text-center">
                {
                image ? (
                    <>
                        <figure>
                            <Image src={image}/>
                        </figure>
                        <div>
                            <Form.Label className={
                                    `${
                                        btnStyles.Button
                                    } btn`
                                }
                                htmlFor="image-upload">
                                Change
                            </Form.Label>
                        </div>
                    </>
                ) : (
                    <Form.Label className="d-flex justify-content-center" htmlFor="image-upload">
                        <Col>
                            <figure className={
                                btnStyles.Button
                            }>
                                <Image src={cloud}
                                    height="100"/>Upload image
                            </figure>
                            <Asset message="Upload image"/>
                        </Col>
                    </Form.Label>
                )
            }
                <Form.File className="d-none" id="image-upload" accept="image/*"
                    onChange={changeImage}
                    ref={imageInput}/>
            </Form.Group>
            {
            errors?.image?.map((msg, idx) => (
                <Alert variant="warning"
                    key={idx}>
                    {msg} </Alert>
            ))
        } </div>
    );
    const formButtons = (
        <span>
            <Form.Group>
                <Button className={
                        btnStyles.Button
                    }
                    type="submit">
                    S A V E
                </Button>
                <Button className={
                        btnStyles.Button
                    }
                    onClick={
                        () => history.goBack()
                }>
                    C a n c e l
                </Button>
            </Form.Group>
        </span>
    );
    return (
        <Form onSubmit={handleSubmit}>
            <h1 className="text-center">update</h1>
            <h3 className="text-center text-secondary">post</h3>
            <Container>{textFields}</Container>
            <Container>{imageField}</Container>
            <Container>{formButtons}</Container>
        </Form>
    );
}

export default EditPostForm;
