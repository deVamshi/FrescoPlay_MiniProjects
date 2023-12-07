// import React, { useState, useEffect } from "react";
// import "./App.css";

// class Home extends React.Component {
//   const [newRating, setnewRating] = useState(1);
//   const [courses, setcourses] = useState([]);

//   const baseURL = "http://localhost:8001/courses";

//   useEffect(() => {
//     handleGetData();
//   }, []);

//   const handleGetData = () => {
//     fetch(baseURL + "/get")
//       .then((res) => res.json())
//       .then((data) => {
//         setcourses(data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleApply = async (id) => {
//     const response = await fetch(baseURL + `/enroll/${id}`, {
//       method: "POST",
//     });

//     const data = await response.json();

//     if (response.status == 200) {
//       alert(data.message);
//     } else {
//       alert(data.error);
//     }

//     handleGetData();
//   };

//   const handleRating = (e) => {
//     // Write your code here
//     setnewRating(e.target.value);
//   };

//   const handleAddRating = async (id) => {
//     console.log(newRating);
//     const response = await fetch(baseURL + `/rating/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         rating: 5,
//       }),
//     });

//     const data = await response.json();

//     if (response.status == 200) {
//       alert(data.message);
//     } else {
//       console.log(data);
//       alert(data.error);
//     }

//     handleGetData();
//   };

//   const handleDrop = async (id) => {
//     const response = await fetch(baseURL + `/drop/${id}`, {
//       method: "DELETE",
//     });

//     const data = await response.json();

//     if (response.status == 200) {
//       alert(data.message);
//     } else {
//       alert(data.error);
//     }

//     handleGetData();
//   };

//   return (
//     <div className="home">
//       <header>
//         <h2>ABC Learning</h2>
//       </header>

//       {courses.length == 0 && "No courses found"}
//       <div className="cardContainer">
//         {courses.map((course) => (
//           <div className="card" key={course._id}>
//             <ul>
//               <div className="header">
//                 <li>{course.courseName}</li>
//                 <li>{course.courseDept}</li>
//                 <li>{course.description}</li>
//                 {course.isApplied ? (
//                   <li>
//                     <li
//                       style={{
//                         visibility: course.isRated ? "hidden" : "visible",
//                       }}
//                     >
//                       Rate:
//                       <select
//                         className="rating"
//                         name="rating"
//                         onChange={(e) => handleRating(e)}
//                       >
//                         <option>1</option>
//                         <option>2</option>
//                         <option>3</option>
//                         <option>4</option>
//                         <option>5</option>
//                       </select>
//                       <button
//                         className="rate"
//                         onClick={() => handleAddRating(course._id)}
//                       >
//                         Add
//                       </button>
//                     </li>
//                     <button
//                       className="drop"
//                       onClick={() => handleDrop(course._id)}
//                     >
//                       Drop Course
//                     </button>
//                   </li>
//                 ) : (
//                   <li>
//                     <button
//                       className="btn"
//                       onClick={() => handleApply(course._id)}
//                     >
//                       Apply
//                     </button>
//                   </li>
//                 )}
//               </div>
//               <div className="footer">
//                 <li>
//                   {`${course.duration} hrs . ${course.noOfRatings} Ratings . ${course.rating}/5`}
//                 </li>
//               </div>
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { Component } from "react";
import "./App.css";

class Home extends Component {
  BASE_URL = "http://localhost:8001/courses";
  state = {
    data: [],
    rating: 1,
  };
  componentDidMount = () => {
    this.handleGetData();
  };

  handleGetData = async () => {
    const res = await fetch(this.BASE_URL + "/get");
    this.setState({ data: await res.json() });
  };

  handleApply = async (id) => {
    // Write your code here
    const res = await fetch(this.BASE_URL + "/enroll/" + id, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    alert(res.status == 200 ? data.message : data.error);
    this.handleGetData();
  };

  handleRating = (e) => {
    this.setState({ rating: e.target.value });
  };

  handleAddRating = async (id) => {
    // Write your code here
    const res = await fetch(this.BASE_URL + "/rating/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: this.state.rating }),
    });
    const { error } = await res.json();
    error && alert(error);
    this.handleGetData();
  };

  handleDrop = async (id) => {
    // Write your code here
    const res = await fetch(this.BASE_URL + "/drop/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    alert(res.status == 200 ? data.message : data.error);
    this.handleGetData();
  };

  render() {
    return (
      <div className="home">
        <header>
          <h2>ABC Learning</h2>
        </header>
        {/* write your code here */}
        <div className="cardContainer">
          {this.state.data.map((course) => {
            const {
              _id,
              courseName,
              courseDept,
              description,
              isApplied,
              isRated,
              duration,
              noOfRatings,
              rating,
            } = course;
            return (
              <div className="card" key={_id}>
                <ul>
                  <div className="header">
                    <li>{courseName}</li>
                    <li>{courseDept}</li>
                    <li>{description}</li>
                    {isApplied ? (
                      <li>
                        {!isRated && (
                          <li>
                            Rate:
                            <select
                              className="rating"
                              name="rating"
                              onChange={this.handleRating}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                            <button
                              className="rate"
                              onClick={() => {
                                this.handleAddRating(_id);
                              }}
                            >
                              Add
                            </button>
                          </li>
                        )}
                        <button
                          className="drop"
                          onClick={() => {
                            this.handleDrop(_id);
                          }}
                        >
                          Drop Course
                        </button>
                      </li>
                    ) : (
                      <li>
                        <button
                          className="btn"
                          onClick={() => {
                            this.handleApply(_id);
                          }}
                        >
                          Apply
                        </button>
                      </li>
                    )}
                  </div>
                  <div className="footer">
                    <li>
                      {duration} hrs . {noOfRatings} Ratings . {rating}/5
                    </li>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
