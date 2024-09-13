import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    recipe_name: "",
    ingredients: "",
    instructions: "",
    image: "",
  });
  const { recipe_name, ingredients, instructions, image } = postData;

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group className={styles.customFormGroup}>
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          name="recipe_name"
          value={recipe_name}
          onChange={handleChange}
          placeholder="Enter the recipe name"
          className={styles.customTextarea}
        />
      </Form.Group>

      <Form.Group className={styles.customFormGroup}>
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="ingredients"
          value={ingredients}
          onChange={handleChange}
          placeholder="List the ingredients"
          className={styles.customTextarea}
        />
      </Form.Group>

      <Form.Group className={styles.customFormGroup}>
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="instructions"
          value={instructions}
          onChange={handleChange}
          placeholder="Write the instructions"
          className={styles.customTextarea}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Dark}`}
        onClick={() => {}}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Dark}`} type="submit">
        Create Recipe
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Dark} btn`} // Change this color too
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;
