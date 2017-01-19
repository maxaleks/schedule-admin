import React from 'react';
import { Table } from 'react-bootstrap';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

import './index.scss';

function getDay(number) {
    const days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return days[number];
}

function getTypeOfCouple(i) {
    const types = ['Лекция', 'Практика', 'Лабораторная'];
    return types[i];
}

function getSubgroup(i) {
    const subgroups = ['Вся группа', '1-я подгруппа', '2-я подгруппа'];
    return subgroups[i];
}

function isInCopyArray(item, array) {
    const foundedItem = array.find(arrItem =>
        Number(arrItem.serialNumber) === Number(item.serialNumber)
        && Number(arrItem.week) === Number(item.week)
        && Number(arrItem.weekday) === Number(item.weekday)
        && Number(arrItem.idSchedule) === Number(item.idSchedule)
    );
    return !!foundedItem;
}

const Group = ({ schedule, openCouplePopup, addToCopyArray, copying, copyCouple, copyArray }) => (
    <div className='group'>
        <div className='group-number'>
            <p>Группа: {schedule.groupName}</p>
        </div>
        <div className='weeks'>
            {schedule.weeks.map((week, index) => (
                <div key={index} className='week'>
                    <div className='week-number'>
                        <p>{week.number} неделя</p>
                    </div>
                    {week.days.map((day, index) => (
                         <div key={index} className='day'>
                            <div className='day-name-bg'></div>
                            <div className='day-name'>
                                <p>{getDay(index)}</p>
                            </div>
                            <div className='couples'>
                                {day.couples.map((couple, index) => (
                                    <div
                                      key={index}
                                      className={cx('pair', {
                                          'to-copy': Number(couple.id) === Number(copyCouple.id),
                                          'in-copy-array': isInCopyArray({
                                              ...couple,
                                              week: week.number,
                                              weekday: day.number,
                                              idSchedule: schedule.id
                                          }, copyArray),
                                      })}
                                    >
                                        <div
                                          className={cx('pair-number', {
                                              green: couple.typeSubject == 1,
                                              yellow: couple.typeSubject == 2,
                                              red: couple.typeSubject == 3,
                                          })}
                                          data-tip={getTypeOfCouple(couple.typeSubject)}
                                        >
                                            <p>{couple.serialNumber}</p>
                                        </div>
                                        <div
                                          className='pair-info'
                                          onClick={copying ?
                                              () => addToCopyArray({
                                                  ...couple,
                                                  week: week.number,
                                                  weekday: day.number,
                                                  idSchedule: schedule.id
                                              }) :
                                              () => openCouplePopup({
                                                  ...couple,
                                                  week: week.number,
                                                  weekday: day.number,
                                                  idSchedule: schedule.id
                                              })
                                          }
                                          title={`${couple.startTime}-${couple.endTime} ${couple.nameSubject}, ${couple.housing}-${couple.lectureRoom}, ${couple.nameProfessor}`}
                                        >
                                            {couple.id && <p>
                                                <strong>
                                                    {couple.startTime}
                                                    -
                                                    {couple.endTime}
                                                </strong>
                                                {couple.nameSubject}, {couple.housing}-{couple.lectureRoom}, {couple.nameProfessor}
                                            </p>}
                                        </div>
                                        <div
                                          className='pair-subgroup'
                                          data-tip={getSubgroup(couple.subgroup)}
                                        >{couple.subgroup}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        {/*<ReactTooltip />*/}
    </div>
);

export default Group;
