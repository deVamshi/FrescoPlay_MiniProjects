/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from "react";

function App() {
  //  * keep this following data as default data in agenda details as it is required for testing
  const initialData = [
    {
      title: "Angular",
      description: "Some description about the angular",
      topics: [
        "Introduction",
        "Typescript",
        "Why Angular?",
        "Understanding Versions",
        "Fundamentals",
      ],
    },
    {
      title: "Vue",
      description: "Some description about the vue",
      topics: [
        "Introduction",
        "Javascript",
        "Why Vue?",
        "Vue Bindings",
        "Component Interaction",
      ],
    },
  ];

  const [agendas, setagendas] = useState(initialData);
  const [formData, setformData] = useState({
    title: "",
    description: "",
    topics: [],
  });
  const [topic, settopic] = useState("");
  const [isTitleValid, setisTitleValid] = useState(true);
  const [isDescValid, setisDescValid] = useState(true);
  const [isTopicValid, setisTopicValid] = useState(true);
  const [isAddingAgenda, setisAddingAgenda] = useState(true);

  const updateForm = (key, e) => {
    e.preventDefault();
    const value = e.target.value;
    if (key == "title") {
      setisTitleValid(value.length > 0);
      setformData({ ...formData, title: value });
    }
    if (key === "description") {
      setisDescValid(value.length > 0);
      setformData({ ...formData, description: value });
    }
    if (key === "topic") {
      setformData({ ...formData, topics: [...formData.topics, topic.trim()] });
      settopic((prev) => "");
    }
  };

  const addAgenda = (e) => {
    e.preventDefault();
    setagendas([...agendas, formData]);
    settopic("");
    setformData({
      title: "",
      description: "",
      topics: [],
    });
  };

  return (
    <div>
      <h1 className="mx-5 mb-5">Agenda Manager</h1>
      {/* show/hide this following add agenda template */}
      {isAddingAgenda && (
        <div className="container" role="addAgenda">
          <button
            className="btn btn-info"
            role="goToView"
            onClick={(e) => {
              e.preventDefault();
              setisAddingAgenda(false);
            }}
          >
            Click To View Agenda
          </button>
          <form>
            <div className="my-3">
              <label className="form-label">Title</label>
              {/* title */}
              <input
                type="text"
                name="newTitle"
                placeholder="Enter the title"
                className="form-control"
                role="inputTitle"
                onChange={(e) => updateForm("title", e)}
                value={formData.title}
              />

              <small className="text-danger" data-testid="invalidTitle">
                {formData.title.trim().length > 0 ? "" : "Title is required"}
              </small>
            </div>
            <div className="my-3">
              <label className="form-label">Description</label>
              {/* description */}
              <input
                type="text"
                name="newDescription"
                placeholder="Enter the description"
                className="form-control"
                role="inputDescription"
                onChange={(e) => updateForm("description", e)}
                value={formData.description}
              />

              <small className="text-danger" data-testid="invalidDescription">
                {formData.description.trim().length > 0
                  ? ""
                  : "Description is required"}
              </small>
            </div>

            <div className="my-3 w-50">
              <label className="form-label">Enter topic</label>
              {/* topic */}
              <input
                type="text"
                name="newTopic"
                placeholder="Enter the topic"
                className="form-control"
                role="inputTopic"
                // value={topic || ""}
                value={topic}
                onChange={(e) => {
                  const val = e.target.value;
                  settopic((prev) => val);
                  setisTopicValid(val.length > 0);
                }}
              />

              <small className="text-danger" data-testid="invalidTopic">
                {topic == "" || topic.trim().length > 0
                  ? ""
                  : "Topic is required"}
              </small>
            </div>
            {/* on click should add topics and disable the button if invalid topic */}
            <button
              disabled={!topic || topic.trim().length === 0}
              className="btn btn-success addAlign"
              role="addTopicBtn"
              onClick={(e) => {
                updateForm("topic", e);
              }}
            >
              + Add Topic
            </button>
            {/* on click should add agenda details and disable the button if invalid inputs */}
            <button
              disabled={
                !isTitleValid || !isDescValid || formData.topics.length === 0
              }
              className="btn btn-success submitAlign"
              role="submitAgendaBtn"
              onClick={(e) => addAgenda(e)}
            >
              Submit Agenda
            </button>
          </form>
          {/* show if no topics added yet */}
          {formData.topics.length === 0 && (
            <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
              No Topics Added
            </div>
          )}

          {/* display the list of topics added using li */}
          <div className="card my-3">
            <div className="card-header">Added Topics</div>
            <div className="card-body">
              <ul className="list-group">
                {formData.topics &&
                  formData.topics.length > 0 &&
                  formData.topics.map((item) => (
                    <li className="list-group-item" role="topicList">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="card-footer">Refer the topics you added</div>
          </div>
        </div>
      )}
      {/* show/hide this following view agenda template */}
      {!isAddingAgenda && (
        <div className="container" role="viewAgenda">
          <button
            className="btn btn-info"
            role="goToAdd"
            onClick={(e) => {
              e.preventDefault();
              setisAddingAgenda(true);
            }}
          >
            Click To Add Agenda
          </button>
          {/* iterate the agenda details to display */}

          {agendas &&
            agendas.length > 0 &&
            agendas.map((item) => {
              return (
                <div className="card my-3" role="cards">
                  <div className="card-header">{item.title}</div>
                  <div className="card-body">
                    <ul className="list-group">
                      {item.topics &&
                        item.topics.map((top) => (
                          <li className="list-group-item">{top}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="card-footer">{item.description}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;

// "start": "react-scripts --openssl-legacy-provider start",
