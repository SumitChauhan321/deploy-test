import React, { useEffect, useState } from "react";
import "./Message.css";

const MessageComponent = () => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const API_URL = "http://localhost:8080";

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Save message
  const saveMessage = async (e) => {
    e.preventDefault();

    try {

      await fetch(`${API_URL}/msg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: message
        })
      });

      setMessage("");

      // Refresh table
      fetchMessages();

    } catch (error) {
      console.log(error);
    }
  };

  // Delete message
  const deleteMessage = async (id) => {

    try {

      await fetch(`${API_URL}/msg/${id}`, {
        method: "DELETE"
      });

      // Refresh table
      fetchMessages();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container">

      <div className="card">

        <h2>Add Message</h2>

        <form onSubmit={saveMessage} className="form">

          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button type="submit">
            Save
          </button>

        </form>

      </div>

      <div className="table-card">

        <h2>All Messages</h2>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {messages.map((msg) => (
              <tr key={msg.id}>

                <td>{msg.id}</td>

                <td>{msg.message}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MessageComponent;