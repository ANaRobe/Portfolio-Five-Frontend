import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";

function EditCommentForm(props) {
  const { id, text, setShowEditForm, setComments } = props;

  const [formText, setFormText] = useState(text);

  const handleChange = (e) => {
    setFormText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        text: formText.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                text: formText.trim(),
                last_edit: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          as="textarea"
          value={formText}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={btnStyles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={btnStyles.Button}
          disabled={!text.trim()}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default EditCommentForm;