import React from 'react';

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const result = parts.map((part) => part.exercises);
  const total = result.reduce((s, p) => {
    return s + p;
  });

  return (
    <p>
      <b>There are a total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header key={course.id} title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
