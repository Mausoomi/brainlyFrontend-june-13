import React, { useState, useEffect } from "react";
import ChartComponent from "./ChartComponent";
import "../Styles/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Fetch_LeaderBoardData_For_Current_Weeked,
  Get_Weekly_Performance_of_Student_All,
} from "../store/Actions/LeaderBoardActions";
import { Get_Count_Student } from "../store/Actions/Authactions";
import { RxCross2 } from "react-icons/rx";
import StarRating from "../Components/StarRating";
import { submitRatings } from "../store/Actions/RatingAction";
import Button from "../Components/Button";
import CrossIcon from "../Assets/Images/Label.png"

function DashBoard() {
  const user = useSelector((state) => state.auth.user);
  const [totalQuestion, setTotalQuestions] = useState(0);
  const [correctQuenstions, setCorrectQuestion] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState(0);
  const [totalWordPractice, setTotalWordPracticed] = useState(0);
  // const [closePopUp, setClosePopUp] = useState(true);
  const [closePopUp, setClosePopUp] = useState(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    console.log("Has visited:", hasVisited); // Debugging line
    return hasVisited !== "true"; // Show popup if not visited
  });

  const [comment, setComment] = useState("");
  const [wordRating, setWordRating] = useState(0);
  const [storyRating, setStoryRating] = useState(0);
  const [questionRating , setQuestionRating]= useState(0)
  const [visitCount, setVisitCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(user?.Children_Name);

  const AllDashboardData = useSelector(
    (state) => state.LeaderBoard.DashboardData
  );

  const WordCount = useSelector((state) => state.auth.WordCount);

  console.log(WordCount);

  // console.log(AllDashboardData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Get_Weekly_Performance_of_Student_All(user._id));
    dispatch(Get_Count_Student(user._id));
  
    console.log("Setting hasVisited in localStorage");
  }, [dispatch, user._id]);

  useEffect(()=>{
  localStorage.setItem("hasVisited", "true");
  },[])

  const userData = AllDashboardData?.filter(
    (ele) => ele.StudentId._id === user._id
  );
  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  console.log(AllDashboardData);

  useEffect(() => {
    if (AllDashboardData.length > 0) {
      const totalqueValue = AllDashboardData.map(
        (ele) => ele.TotalquestionsattemptedCount
      ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const totalCorrectValue = AllDashboardData.map(
        (ele) => ele.QuestionsCorrectCount
      ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      const totalWrongValue = AllDashboardData.map(
        (ele) => ele.QuestionsWrongCount
      ).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      setTotalQuestions(totalqueValue);
      setCorrectQuestion(totalCorrectValue);
      setWrongQuestions(totalWrongValue);
      setTotalWordPracticed(WordCount[0]?.Count);
    }
  }, [AllDashboardData, WordCount]);

  console.log(WordCount[0]?.Count);
  console.log(totalWordPractice);

  const handleForgotPasswordClose = (e) => {
    e.preventDefault();
    setClosePopUp(false);
  };
  // const handleSubmit = async () => {
  //   const ratings = { wordRating, storyRating , comment};

  //   console.log(ratings);
  //      setClosePopUp(false);

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (storyRating === 0 || wordRating === 0) {
      setErrorMessage("Please rate both the quality of stories and words.");
      return;
    }
    setErrorMessage(""); // Clear any existing errors if the submission is valid

    const rating = { wordRating, storyRating, comment };
    console.log(rating, ".....rating");
    setClosePopUp(false);
    dispatch(
      submitRatings({
        wordRating: wordRating,
        storyRating: storyRating,
        questionRating:questionRating,
        comment: comment,
      })
    );
  };

  // useEffect(() => {
  //   dispatch(
  //     submitRatings({
  //       wordRating: wordRating,
  //       storyRating: storyRating,
  //       comment: comment,
  //     })
  //   );
  // }, [wordRating, storyRating, comment]);

  return (
    <>
      <div className="text-white dashboard-bg">
        <div>
          <div>
            <h1 className="client-name-h">
              {capitalizeFirstLetter(user?.Children_Name)}
            </h1>
          </div>
          <div>
            <div>
              <h4 className="chart-h">Activity</h4>

              <div className="activity-container">
                <div className="ab-1">
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-4.png")} alt="" />
                    <div>
                      <p>Total Questions</p>
                      <h5>{totalQuestion}</h5>
                    </div>
                  </div>
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-3.png")} alt="" />
                    <div>
                      <p>Correct Answers</p>
                      <h5>{correctQuenstions}</h5>
                    </div>
                  </div>
                </div>
                <div className="ab-1">
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-2.png")} alt="" />
                    <div>
                      <p>Wrong Answered</p>
                      <h5>{wrongQuestions}</h5>
                    </div>
                  </div>
                  <div className="activity-box">
                    <img src={require("../Assets/Images/d-1.png")} alt="" />
                    <div>
                      <p>Total Words Practiced</p>
                      {WordCount[0]?.Count ? (
                        <h5>{WordCount[0]?.Count}</h5>
                      ) : (
                        <h5>0</h5>
                      )}
                      {/* <h5>{WordCount[0]?.Count}</h5> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="activity-container">
              <div style={{ color: "white" }}>
                <ChartComponent />
              </div>
            </div>
          </div>
        </div>

        <div className={`popup-backdrop ${closePopUp ? "flex" : "hidden"}`}>
          <div className="popup">
            <div>
              <div className="flex justify-between">
                <h1 className="font-poppins   SignText colorBlue ">
                  Please Provide Valuable Feedback
                </h1>
                <button id="crossReview" onClick={handleForgotPasswordClose}>
                  <img src={CrossIcon} alt="cross" />
                  {/* <RxCross2 className="colorBlue" /> */}
                </button>
              </div>

              <form>
                <div className="flex flex-col sm:py-4 py-2">
                  <label className=" font-poppins text-white userInfoText">
                    Rate the Quality of Stories
                  </label>
                  <div>
                    <StarRating
                      totalStars={5}
                      selectedStars={storyRating}
                      onRating={setStoryRating}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:py-4 py-2">
                  <label className=" font-poppins text-white userInfoText">
                    Rate the Quality of Words
                  </label>
                  <div>
                    <StarRating
                      totalStars={5}
                      selectedStars={wordRating}
                      onRating={setWordRating}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:py-4 py-2">
                  <label className=" font-poppins text-white userInfoText">
                    Rate the Quality of Questions
                  </label>
                  <div>
                    <StarRating
                      totalStars={5}
                      selectedStars={questionRating}
                      onRating={setQuestionRating}
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:py-4 py-2">
                  <textarea
                    className="userInfoBox h-[100px]"
                    name="comment"
                    form="usrform"
                    placeholder="Comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </form>
              <div>
                <Button btnText="Submit" onClickFunction={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
