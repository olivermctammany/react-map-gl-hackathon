import * as React from 'react';
import { ChangeEventHandler } from 'react';

function formatTime(time) {
  console.log("changing");
  if (time === 1) return "ALPHA";
  else if (time === 1) return 'BETA';
  else return 'GAMMA';
}

function ControlPanel(props) {
  let {startTime, endTime, onChangeTime, allDays, onChangeAllDays, selectedTime, showBox} = props;
  const selectedDay = 1;
  console.log(selectedTime);
  let key = 0;

  const onSelectDay = evt => {

    const daysToAdd = evt.target.value;
    onChangeTime(daysToAdd);
  };

  const changeValue = (a: any) => {
    selectedTime = a.target.defaultValue
    onChangeTime(selectedTime);
    console.log(selectedTime);
    key++;
  }

  return (
    <div className="control-panel">
      {(!showBox || selectedTime == 3) &&
        <><h3>Clearance Level</h3><hr /><div key={key}>
          <input type="radio" value="1" name="cl" checked={selectedTime == 1} onChange={changeValue} /> ALPHA
          <input type="radio" value="2" name="cl" checked={selectedTime == 2} onChange={changeValue} /> BETA
          <input type="radio" value="3" name="cl" checked={selectedTime == 3} onChange={changeValue} /> GAMMA
          {/* <input
      type="range"
      min={1}
      max={3}
      value={selectedDay}
      step={1}
      onChange={onSelectDay}
    /> */}
        </div><hr /></>
      }
      {showBox && selectedTime < 3 &&
      <>
        <h3>Tweet Data</h3>
        <table>
          <tr>
            {selectedTime == 1 && <th>Name</th> }
            {selectedTime == 1 && <th>Handle</th> }
            <th>Text</th>
            <th>Time</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
          <tr>
            {selectedTime == 1 && <td>John Yardley</td> }
            {selectedTime == 1 && <td>@jyard</td> }
            <td>I got the meat @jared_denney</td>
            <td>1643930753000</td>
            <td>-104.9751245</td>
            <td>39.73312358</td>
          </tr>
          <tr>
            {selectedTime == 1 && <td>Mackayla Macky</td> }
            {selectedTime == 1 && <td>@mackmack4u</td> }
            <td>One thing about me........ Ima get this handled</td>
            <td>1643930624000</td>
            <td>-104.9750245</td>
            <td>39.73312358</td>
          </tr>
          <tr>
            {selectedTime == 1 && <td>Sage Wisdom</td> }
            {selectedTime == 1 && <td>@sagewisdom</td> }
            <td>Just posted a photo @KimMangone</td>
            <td>1643930112000</td>
            <td>-104.9751224</td>
            <td>39.7291723</td>
          </tr>
        </table>
      </>}
    </div>
  );
}

export default React.memo(ControlPanel);
