import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/PostsPage.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Container, Row, Col, Form } from "react-bootstrap";
import NoResults from "../../assets/no-results.png";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?owner__profile=${currentUser.profile_id}&is_private=True&search=${query}`);
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        // Handle error
      }
    };

    setHasLoaded(false);
    fetchRecipes();
  }, [query, currentUser]);

  return (
    <Container>
      <Row>
        <Col>
          <Form
            className={styles.SearchBar}
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className="mr-sm-2"
              placeholder="Search recipes"
            />
          </Form>
          {hasLoaded ? (
            recipes.results.length ? (
              <InfiniteScroll
                dataLength={recipes.results.length}
                loader={<Asset spinner />}
                hasMore={!!recipes.next}
                next={() => fetchMoreData(recipes, setRecipes)}
              >
                {recipes.results.map((recipe) => (
                  <Recipe key={recipe.id} {...recipe} />
                ))}
              </InfiniteScroll>
            ) : (
              <Container className={styles.Content}>
                <Asset src={NoResults} message="No recipes found." />
              </Container>
            )
          ) : (
            <Container className={styles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipesPage;

