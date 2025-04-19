import React, { useState, useEffect, useRef, useContext } from "react";
import { socket } from "../Components/Socket"; // Assuming socket is already set up
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Context/AuthContext";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesDiv = useRef(null);
  const textareaRef = useRef();
  const { username } = useParams();
  const { user } = useContext(UserContext);
  const [UserToChat, setUserToChat] = useState();
  const [isUserOnline, setIsUserOnline] = useState()

  const handleSendMessage = async () => {
    if (!text) return;
    socket.emit("chat-msg", {
      msg: text,
      sender: user.username,
      receiver: username,
    });

    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  const HandleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSendMessage();
      setText("");
      // textareaRef.current.style.height = "auto"
      // textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    if (!user) return;
    const handleConnect = () => {
      console.log("HERE IS USER", user);
      console.log("Socket connected again:", socket.id);
      socket.emit("register", user.username);
    };

    if (socket.connected) {
      handleConnect();
    }
    socket.emit("msg-seen", { sender: username, receiver: user?.username });
    socket.on("connect", handleConnect);
    socket.on("id-msg", (data) => {
      console.log("id-msg", data);
      setMessages((prevMessages) => [...prevMessages, data.createdMessage]);
    });
    socket.on("receive-msg", (message) => {
      console.log("receive msg", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, status: "delivered" }, // Status updated to 'delivered'
      ]);
    });
    socket.on("message-status-updated", ({ messageId, status }) => {
      console.log("statys", status, messageId);
      setMessages((prevMessages) => {
        console.log("first");
        return prevMessages.map((message) => {
          console.log(message._id, messageId, message._id == messageId);
          if (message._id === messageId) {
            console.log(
              "Updating message second",
              message._id,
              "to status:",
              status
            );
            return { ...message, status };
          }
          return message;
        });
      });
    });
    socket.on("user-online", (users) => {
      console.log("Online users", users)
      if (users.includes(username)) {
        setIsUserOnline("Online")
        console.log("online");
      } else {
        setIsUserOnline("Offline")
      }
    });
    return () => {
      socket.off("receive-msg");
      socket.off("message-status-updated");
      socket.off("id-msg");
      socket.off("connect", handleConnect);
      socket.off("user-offline");
      socket.off("user-online");
    };
  }, [user?.username, messages]);

  useEffect(() => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    async function GetMessages() {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/get-messages?sender=${user?.username
        }&receiver=${username}`,
        {},
        { withCredentials: true }
      );
      setMessages(res.data.messages.reverse());
      setUserToChat(res.data.receiver);
      console.log("Chat", res.data);
    }
    GetMessages();
  }, [user?.username]);

  return (
    <div className="pl-42 h-screen w-full ">
      <div className="h-full w-full flex flex-col">
        <div className="top border-b border-b-[#878787bd] bg-[#000] grow-0 px-6 py-4 flex items-center justify-between">
          <div className="container flex items-center gap-4">
            <div className="image h-10 w-10 rounded-full overflow-hidden bg-yellow-50">
              <img
                className="h-full w-full object-center object-cover"
                src={`${UserToChat?.profilePicture}`}
              />
            </div>
            <div className="username-to-chat text-white text-md font-bold flex flex-col gap-1">
              <span>{username}</span>
              <span className="text-xs text-gray-500">{isUserOnline || "hel"}</span>
            </div>
          </div>
          <Link
            to={`/user/${username}`}
            className="btn rounded-full flex items-center justify-center h-10 w-10 hover:bg-[#ffffff35] cursor-pointer "
          >
            <i className="ri-information-line text-xl text-white"></i>
          </Link>
        </div>
        <div
          ref={messagesDiv}
          className="messages-part grow bg-[#000] pt-5 overflow-y-auto relative px-3 "
        >
          {/* <!-- Incoming Message --> */}
          {messages?.length > 0 ? (
            messages.map((msg, index) => {
              return msg.sender == user?.username ? (
                <div
                  key={index}
                  className="flex justify-end mb-4 cursor-pointer"
                >
                  <div className="flex flex-col max-w-96 bg-[#0095F6] text-white rounded-lg p-3 gap-3 relative">
                    <p className="flex items-end gap-2">
                      <span>{msg.msg}</span>
                      <span className="block text-[#e5e5e5b0] text-xs text-end">
                        {msg.status}
                      </span>
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                    <img
                      src={user?.profilePicture}
                      alt="My Avatar"
                      className="w-8 h-8 rounded-full"
                    ></img>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex mb-4 cursor-pointer">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                    <img
                      src={`${UserToChat?.profilePicture}`}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    ></img>
                  </div>
                  <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                    <p className="flex items-end gap-2">
                      <span>{msg.msg}</span>
                      <span className="block text-[#e5e5e5b0] text-xs text-end">
                        {msg.status}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xl text-center text-white">
              Send messages to chat.
            </div>
          )}

          {/* <!-- Outgoing Message --></img> */}
        </div>
        <div className="bottom-send-message-part grow-0 text-white flex items-end border-t border-t-[#878787bd] p-2 ">
          <textarea
            ref={textareaRef}
            rows={1}
            className="outline-none grow break-words min-h-[40px] max-h-[150px] overflow-auto p-2 rounded rounded-r-none  text-white resize-none"
            placeholder="Enter a message"
            value={text}
            onChange={handleChange}
            onKeyDown={HandleKeyDown}
            style={{ minHeight: "40px" }} // Ensure minimum height
          />{" "}
          <button
            onClick={handleSendMessage}
            className="relative text-white h-fit px-3 py-2 hover:bg-[#69696996] cursor-pointer rounded rounded-l-none group"
          >
            <i className="ri-send-plane-2-fill inline-block transition-all duration-300 group-active:translate-x-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
