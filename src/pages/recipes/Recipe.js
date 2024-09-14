import React from "react";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Post.module.css";

const Recipe = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    recipe_name,
    ingredients,
    instructions,
    updated_at,
    isPrivate, // Use this prop
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/recipes/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/recipes/${id}/`);
      if (isPrivate) {
        history.push("/recipes"); // Redirect to the recipes page for private recipes
      } else {
        history.push("/posts"); // Redirect to the posts page for regular posts
      }
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Card className={styles.Recipe}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Card.Body>
        {recipe_name && <Card.Title className="text-center">{recipe_name}</Card.Title>}
        {ingredients && (
          <Card.Text>
            <strong>Ingredients:</strong> {ingredients}
          </Card.Text>
        )}
        {instructions && (
          <Card.Text>
            <strong>Instructions:</strong> {instructions}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Recipe;
