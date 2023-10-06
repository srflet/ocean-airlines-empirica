import React, { Component } from "react"

// Get all the elements to build the matrix
import MatrixQ from "../../../../general/question-formats/MatrixQ" // Samuel's default matrix component
import {
  DisagreeAgree5,
  DisagreeAgree7,
} from "../../../../general/question-formats/scales/DisagreeAgree5" // 5-point Likert scale of agreement
import { getConditionalsMulti } from "../../../../general/question-formats/conditionals/getConditionals" // Checking that the player has answered all the questions

// These are buttons that automatically deal with the changing of the page, and whether or not it should be disabled based on
// whether the player answered all the questions (otherwise the next button will be disabled and there will be a red warning text)
import ChangePageButtons from "../../../../general/buttons/ChangePageButtons"

export default class TaskConflict extends Component {
  state = {
    name: "TaskConflict",
  }

  // Scroll to the top when this component starts
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { player, pageDbIndex, min } = this.props

    // Prepare the questions for this matrix
    const questions = [
      "My team members and I experienced conflict of ideas",
      "My team members and I experienced conﬂicting opinions about which ideas to choose",
      "My team members and I experienced disagreements about how to pick the best ideas",
    ]
    const responseScale = DisagreeAgree7

    // Prepare conditional for the 'next' button
    const disabledCondition = getConditionalsMulti(
      player,
      this.state.name,
      questions
    )

    return (
      <div>
        <MatrixQ
          player={player}
          dbIndex={this.state.name}
          questions={questions}
          responseScale={responseScale}
          head={
            "Please indicate the extent to which you agree with the following statements:"
          }
        />

        <br />

        <ChangePageButtons
          player={player}
          pageDbIndex={pageDbIndex}
          min={min}
          disabledCondition={disabledCondition}
        />
      </div>
    )
  }
}