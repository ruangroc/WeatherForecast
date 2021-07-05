/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';
import Weather from './Weather';

const ListItem = styled.li`
    list-style-type: none;
`;

const CardLayout = styled.div`
    background-color: #7AC2E1;
    width: 250px;
    margin: 5px;
    border-radius: 20px;
    box-shadow: 5px 5px 5px #023047;
`;

export default function Card(props) {
    var days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"};
    var months = {
        0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
        6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
    };

    function getDate(timestamp) {
        var currentDate = new Date(timestamp*1000);
        var cDate = currentDate.getDate();
        var cMonth = months[currentDate.getMonth()];
        var cYear = currentDate.getFullYear();
        return (`${cMonth} ${cDate}, ${cYear}`);
    }

    function getDayOfWeek(timestamp) {
        var currentDate = new Date(timestamp*1000);
        return days[currentDate.getDay()];
    }

    return (
      <CardLayout>
          <ul>
            <ListItem>{getDayOfWeek(props.date)}</ListItem>
            <ListItem>{getDate(props.date)}</ListItem>
            <ListItem><Weather symbol={props.weatherSymbol} description={props.description}/></ListItem>
            <ListItem>High temp: {Math.floor(props.highTemp)} F</ListItem>
            <ListItem>Low temp: {Math.floor(props.lowTemp)} F</ListItem>
            <ListItem>Precipitation: {props.precipitation * 100}%</ListItem>
            <ListItem>{props.description} </ListItem>
          </ul>
      </CardLayout>
    );
}