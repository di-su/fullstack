import React from 'react';

const Course = ({course}) => {

    const Header = (props) => {
      return (
        <h1>{props.course}</h1>
      )
    }

    const Content = ({parts}) => {

      return (
        <div>
          {parts.map(x => 
            <p key={x.id}>
              {x.name} {x.exercises}
            </p>
          )}
        </div>
      )
    }

    const Total = ({parts}) => {
      const sum = (accumulator, currentValue) => accumulator + currentValue;
      const exercisesArray = parts.map(x => x.exercises)
      const totalExercises = exercisesArray.reduce(sum)
      return (
      <p>Total of {totalExercises} exercises</p>
      )
    }

    return (
      <div>
          <Header course={course.name}></Header>
          <Content parts={course.parts}></Content>
          <Total parts={course.parts}></Total>
      </div>
    )
}

export default Course