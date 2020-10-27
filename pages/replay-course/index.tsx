import React from 'react'
import Card from '../../layouts/Card'
import ButtonLink from '../../components/ButtonLink'
import SubTitle from '../../components/SubTitle'
import TextInput from '../../components/TextInput'
import RadioTable from '../../components/RadioTable'
import { yourCoursesData } from '../../utils/toggleData'

export default function ReplayCourse(): JSX.Element {
  const formatTableData = yourCoursesData.map((item) => {
    return {
      id: item.id,
      text: item.course,
      label: item.course,
      name: 'course',
    }
  })
  return (
    <div>
      <div className="card-container">
        <Card>
          <SubTitle title="Select Course" />
          <div className="input-container mt-20px">
            <TextInput placeHolder="Search for other course" />
          </div>
          <div className="input-container">
            <RadioTable toggleValues={formatTableData} />
          </div>
        </Card>
      </div>
      <div className="button-container">
        <ButtonLink label="Start Course" link="/holes/one" />
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
        .input-container {
          margin-bottom: 2em;
          text-align: center;
        }

        .mt-20px {
          margin-top: 20px;
        }
      `}</style>
    </div>
  )
}