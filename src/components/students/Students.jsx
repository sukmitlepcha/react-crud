import React, { useState } from "react";
import axios from "axios";
import { Form, Pagination, Table } from "react-bootstrap";
import { paginate, sorting } from "../../common/utils";
import "./students.css";
import { useLocation } from "react-router-dom";

let allStudents = null;

function Students() {
  const { search } = useLocation();
  const searchObject = new URLSearchParams(search);
  const [students, setStudents] = useState(null);

  const [currentPage, setCurrentPage] = useState(3);
  const [pageSize, setPageSize] = useState(
    parseInt(searchObject.get("pageSize")) || 5
  );

  const [sortBy, setSortBy] = useState(searchObject.get("sortBy") || "id");

  const [sortOrder, setSortOrder] = useState(
    +searchObject.get("sortOrder") || 1
  );

  const [sortDataType, setSortDataTpye] = useState("number");

  const totalLinks = students && Math.ceil(students.length / pageSize);
  const linksArray = [...Array(totalLinks).keys()];

  React.useEffect(() => {
    axios("https://624558a80e8dd89b543bd9f5.mockapi.io/students").then(
      (res) => {
        setStudents(res.data);
        allStudents = res.data;
      }
    );
  }, []);
  let sortedStudents =
    students && sorting(students, sortBy, sortDataType, sortOrder);

  let paginatedStudents =
    students && paginate(sortedStudents, currentPage, pageSize);
  const handlePageChange = (e) => {
    setCurrentPage(0);
    setPageSize(Number(e.target.value));
  };

  const handelSort = (col, type) => {
    if (!(sortBy == col)) {
      setSortOrder(1);
      setSortBy(col);
      setSortDataTpye(type);
    } else {
      setSortOrder(sortOrder == 1 ? -1 : 1);
      setSortBy(col);
      setSortDataType(type);
    }
  };

  return (
    <div>
      <div className="pagination-wrapper d-flex justify-content-center">
        <Pagination>
          {linksArray?.map((link) => (
            <Pagination.Item
              onClick={() => setCurrentPage(link)}
              active={link === currentPage ? true : false}
              key={link}
            >
              {link + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <From.Select onChange={handlePageChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </From.Select>
      <Form.Group>
        <From.Control type="text" placeholder="Search the students.." />
      </Form.Group>

        <Table className="students-table" striped variant="dark">
        <thead>
          <tr>
            <th onClick={() => handelSort("Id", "number")}>ID</th>
            <th onClick={() => handelSort("name", "string")}>NAME</th>
            <th onClick={() => handelSort("address", "string")}>ADDRESS</th>
            <th onClick={() => handelSort("contact", "number")}>CONTACT</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStudents?.map((stu) => (
            <tr>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.address}</td>
              <td>{stu.contact}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Students;
