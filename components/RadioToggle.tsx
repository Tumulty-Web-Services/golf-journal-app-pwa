import React, { useState } from 'react'
import styles from '../styles/RadioToggle.module.css'
import { RadioValue } from '../interfaces'

type Props = {
  toggleValues: RadioValue[]
}

export default function RadioToggle({ toggleValues }: Props): JSX.Element {
  const [value, setValue] = useState(toggleValues[0].label)

  function saveValue(item) {
    setValue(item)
  }

  function onChange() {
    return
  }

  return (
    <div className={`${styles.radioToolbar} stories-radioToolbar`}>
      {toggleValues.map((radioItem) => (
        <span key={radioItem.label}>
          <input
            type="radio"
            id="radioToggle"
            name={radioItem.name}
            value={radioItem.label}
            onClick={() => saveValue(radioItem.label)}
            onChange={() => onChange}
            checked={value === radioItem.label}
          />
          <label htmlFor="radioToggle">{radioItem.text}</label>
        </span>
      ))}
    </div>
  )
}