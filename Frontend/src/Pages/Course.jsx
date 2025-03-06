import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LuPlus } from "react-icons/lu";

function Course() {
  const [show, setShow] = useState(false); // Modal for adding courses
  const [show1, setShow1] = useState(false); // Modal for adding course units
  const [show2, setShow2] = useState(false); // Modal for editing course units
  const [courses, setCourses] = useState([
    // Initial table data
    { id: 1, name: "BTECH", code: "010", faculty: "Engineering", duration: 4 },
    { id: 2, name: "BPharma", code: "015", faculty: "Pharmacy", duration: 4 },
  ]);
  const [formData, setFormData] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(""); // Holds selected course for search

  // Handlers for modals
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);

  // Common change handler for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add new course
  const handleAddCourse = () => {
    const newCourse = {
      id: courses.length + 1,
      name: formData.courseName,
      code: formData.courseCode,
      faculty: formData.faculty,
      duration: formData.studyPeriod,
    };
    setCourses((prev) => [...prev, newCourse]);
    console.log("New Course:", newCourse);
    handleClose();
  };

  // Add new course unit (logs to console for demonstration)
  const handleAddCourseUnit = () => {
    console.log("New Course Unit:", formData);
    handleClose1();
  };

  // Edit course unit (logs to console for demonstration)
  const handleEditCourseUnit = () => {
    console.log("Edited Course Unit:", formData);
    handleClose2();
  };

  // Handle course selection for search
  const handleCourseSelection = (e) => {
    setSelectedCourse(e.target.value);
    console.log("Selected Course:", e.target.value);
  };

  return (
    <div>
      <div className="m-3">
        <h3>Courses</h3>
        <p>View or edit courses and course units from here.</p>
        <div className="row">
          <div className="col-lg-4">
            <button
              className="mt-2 bg-primary text-white rounded-pill border p-3"
              onClick={handleShow}
            >
              <LuPlus className="plus" /> New Course
            </button>
          </div>
          <div className="col-lg-4">
            <button
              className="mt-2 bg-info text-white rounded-pill border p-3"
              onClick={handleShow1}
            >
              <LuPlus className="plus" /> New Course Unit
            </button>
          </div>
          <div className="col-lg-4">
            <button
              className="mt-2 bg-warning text-white rounded-pill border p-3"
              onClick={handleShow2}
            >
              <LuPlus className="plus" /> Edit Course Unit
            </button>
          </div>
        </div>

        <div className="d-flex mt-4">
          {/* Table */}
          <div className="table-responsive" style={{ flex: "3" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Course Name</th>
                  <th>Code</th>
                  <th>Faculty</th>
                  <th>Duration (Years)</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.code}</td>
                    <td>{course.faculty}</td>
                    <td>{course.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Search Section */}
          <div className="section3 card ms-3" style={{ flex: "1" }}>
            <div className="card-body">
              <h5 className="card-title">Search</h5>
              <p className="card-text">Select a course to view the course units</p>
              <div className="dropdown">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={selectedCourse}
                  onChange={handleCourseSelection}
                >
                  <option value="">--- SELECT ---</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {/* Add New Course Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="courseName"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Course Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="courseCode"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Faculty</label>
                <input
                  type="text"
                  className="form-control"
                  name="faculty"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Study Period (Years)</label>
                <input
                  type="number"
                  className="form-control"
                  name="studyPeriod"
                  onChange={handleChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddCourse}>
              Add
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Course;
