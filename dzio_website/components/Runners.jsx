import _ from "lodash";
import React from "react";
import '@fortawesome/fontawesome';

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";

import Carousel from 'react-bootstrap/Carousel'


export default class Runners extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            runnerSelected : null
        }
    }

    componentWillReceiveProps(props) {
        this.setState({runnerSelected : null});
    }

    getCasaqueImgPath(race, runner) {

        let date = new Date(this.props.race.date);
        return '/img/casaques/'+date.getFullYear()+("0" + (date.getMonth() + 1)).slice(-2)+("0" + date.getDate()).slice(-2)+'-R'+race.reunion.number+'C'+race.number+'P'+runner.number+'.png';
    }

    selectRunner(runner) {

        if(runner === this.state.runnerSelected) {
            this.setState({runnerSelected : null});
        }
        else {
            this.setState({runnerSelected : runner})
        }
    }

    render() {

        let listRunners = [];
        if(this.props.race) {
            listRunners = this.props.race.runners.map((runner) =>
                <div key={runner.number} >
                    <div className="runner" onClick={() => this.selectRunner(runner)}>
                        <span className="runner-rank">{runner.number}</span>
                        <span className="runner-img">
                            <img src={this.getCasaqueImgPath(this.props.race, runner)}/>
                        </span>
                        <span className="runner-name">
                            <p>{(runner.translation ? runner.translation.name : null) || runner.name} {runner.doNotRun ? <span className="do-not-run"><Trans i18nKey="Do not run">Do not run</Trans></span> : null}</p>
                            <span>{(runner.translation ? runner.translation.jokey : null) || runner.jokey}</span>
                        </span>
                        <span className="runner-cote">
                            <span>{runner.signs} {runner.reportEvol}</span>
                        </span>
                    </div>
                    {
                        this.state.runnerSelected && this.state.runnerSelected.number === runner.number
                        ?
                            <div className="runner-details">
                                <Carousel interval={null} fade={true}>
                                    <Carousel.Item>
                                        <Carousel.Caption>
                                            <h3><Trans i18nKey="Runner details">Runner details</Trans></h3>
                                            <ul>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Coach">Coach</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.coach : null) || runner.coach}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Owner">Owner</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.owner : null) || runner.owner}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Farmer">Farmer</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.farmer : null) || runner.farmer}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Breed">Breed</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.breed : null) || runner.breed}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Gender">Gender</Trans></span>
                                                    <span className="runner-detail-value">{runner.sex==='H'?<Trans i18nKey="Male">Male</Trans>:<Trans i18nKey="Female">Female</Trans>}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Birthday">Birthday</Trans></span>
                                                    <span className="runner-detail-value">{runner.birthday}</span>
                                                </li>
                                            </ul>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Carousel.Caption>
                                            <h3><Trans i18nKey="Ancestry">Ancestry</Trans></h3>
                                            <ul>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Name of the mother">Name of the mother</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.mother : null) || runner.mother}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Name of the father">Name of the father</Trans></span>
                                                    <span className="runner-detail-value">{(runner.translation ? runner.translation.father : null) || runner.father}</span>
                                                </li>
                                            </ul>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Carousel.Caption>
                                            <h3><Trans i18nKey="Performances">Performances</Trans></h3>
                                            <ul>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Number of races">Number of races</Trans></span>
                                                    <span className="runner-detail-value">{runner.nbRaces}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Number of races won">Number of races won</Trans></span>
                                                    <span className="runner-detail-value">{runner.nbRacesWon}</span>
                                                </li>
                                                <li>
                                                    <span className="runner-detail-title"><Trans i18nKey="Number of places">Number of places</Trans></span>
                                                    <span className="runner-detail-value">{runner.nbPlaces}</span>
                                                </li>
                                            </ul>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        :
                            null
                    }
                </div>
            );
        }
        
        return <div>

            <div className="title double-title m-b-0">
                <h3>The runners</h3>
                <span className="add-value"><img src="https://www.equidia.fr/assets/img/icons-png/discipline_trot.png" alt="Monté"/><span>R{this.props.reunion.externNumber} C{this.props.race.number}</span></span>
            </div>
            <div className="runners-tab">
                <div className="table-striped">
                    {listRunners}
                </div>
            </div>
        </div>
    }
}