import React from 'react'
import Card from '../../layouts/Card'
import ButtonLink from '../../components/ButtonLink'
import SubTitle from '../../components/SubTitle'
import FlexTable from '../../components/FlexTable'
import { yourCoursesData } from '../../utils/toggleData'

export default function Welcome(): JSX.Element {
  const formatTableItems = yourCoursesData.map((items) => {
    return {
      itemOne: items.course,
      itemTwo: items.score,
    }
  })

  return (
    <div>
      <div className="card-container">
        <Card>
          <>
            <SubTitle title="Course History" />
            <FlexTable tableItems={formatTableItems} />
          </>
        </Card>
      </div>
      <div className="button-container">
        <ButtonLink label="New Course" link="/course-information" />
      </div>
      <div className="button-container">
        <ButtonLink label="Replay Course" link="/replay-course" />
      </div>
      <style jsx>{`
        .card-container {
          margin-top: 6em;
          margin-bottom: 3em;
        }

        .button-container {
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 20px;
          max-width: 400px;
        }
      `}</style>
    </div>
  )
}