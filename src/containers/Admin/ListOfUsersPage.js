import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  //Button,
  Table,
  //FormCheck,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "../../components/SearchBar";
import PaginationBar from "../../components/PaginationBar";

import { userActions } from "../../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";

const ListOfUsersPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState({ key: "", ascending: -1 });
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const users = useSelector((state) => state.user.users);
  const totalPageNum = useSelector((state) => state.user.totalPageNum);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setPageNum(1);
    setQuery(searchInput);
  };

  const handleSort = (key) => {
    if (!loading) {
      setSortBy((sortBy) => ({ key, ascending: -sortBy.ascending }));
    }
  };

  useEffect(() => {
    dispatch(userActions.usersRequest(pageNum, 10, query, sortBy));
  }, [dispatch, pageNum, query, sortBy]);

  return (
    <Container fluid={true}>
      <h4 className="mt-3">Users Management</h4>

      <Row>
        <Col>
          <SearchBar
            searchInput={searchInput}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmitSearch}
            loading={loading}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="mouse-hover" onClick={() => handleSort("name")}>
                  User Name <FontAwesomeIcon icon="sort" size="sm" />
                </th>

                <th>Joined At</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <Link to={`/admin/list-of-users/${user._id}`}>
                      {user.name}
                    </Link>
                  </td>

                  <td>
                    <Moment fromNow>{user.createdAt}</Moment>
                  </td>

                  <td>
                    <Badge variant="info">'Delete this user' placeholder</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            total={totalPageNum}
            loading={loading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ListOfUsersPage;
