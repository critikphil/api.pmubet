import _ from "lodash";
import React from "react";
import {Trans} from "react-i18next";


export default class PredictionTop extends React.Component {

    constructor(props) {

        super(props);

        if(props.predictionTop) {
            let runnerRank = _.find(props.predictionTop.predictions, function(runner){ return parseInt(runner.rank) === parseInt(1); });
            let runnerSelected = _.find(props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });

            runnerSelected.name = (runnerSelected.translation ? runnerSelected.translation.name : null) || runnerSelected.name;
            runnerSelected.comment = (runnerSelected.translation ? runnerSelected.translation.comment : null) || runnerSelected.comment;

            this.state = {runnerSelected : runnerSelected}
        }
    }

    componentWillReceiveProps(props) {

        if(props.predictionTop) {
            let runnerRank = _.find(props.predictionTop.predictions, function(runner){ return parseInt(runner.rank) === parseInt(1); });
            let runnerSelected = _.find(props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });

            runnerSelected.name = (runnerSelected.translation ? runnerSelected.translation.name : null) || runnerSelected.name;
            runnerSelected.comment = (runnerSelected.translation ? runnerSelected.translation.comment : null) || runnerSelected.comment;

            this.setState({runnerSelected : runnerSelected});
        }
    }

    setRunnerSelected(number) {

        let runnerRank = _.find(this.props.predictionTop.predictions, function(runner){ return parseInt(runner.number) === parseInt(number); });
        let runnerSelected = _.find(this.props.race.runners, function(runner){ return parseInt(runner.number) === parseInt(runnerRank.number); });

        runnerSelected.name = (runnerSelected.translation ? runnerSelected.translation.name : null) || runnerSelected.name;
        runnerSelected.comment = (runnerSelected.translation ? runnerSelected.translation.comment : null) || runnerSelected.comment;

        this.setState({runnerSelected : runnerSelected});
    }

    render() {

        return <div className="prediction-top">
            <div className="title m-b-0">
                <h3><Trans i18nKey="PMUBET Predictions">PMUBET Predictions</Trans></h3>
            </div>
            <div className="prediction">
                <div className="prediction-header">
                    {
                        this.props.predictionTop
                        ?
                            <ul className={this.props.predictionTop.predictions.length > 6 ? 'minimized' : ''}>
                                {
                                    this.props.predictionTop.predictions.map((runner) =>
                                        <li key={parseInt(runner.number)} className={parseInt(runner.number)===parseInt(this.state.runnerSelected.number)?'active' : '' }><a onClick={() => this.setRunnerSelected(runner.number)}>{runner.number}</a></li>
                                    )
                                }
                            </ul>
                        :
                            null
                    }
                </div>
                <div className="prediction-body tab-content">

                    {
                        this.props.predictionTop
                        ?
                            <div>
                                <h2 className="text-uppercase">
                                    <b className="primary-color">{this.state.runnerSelected.number}</b> -
                                    <a href="javascript:;">{this.state.runnerSelected.name}</a>
                                </h2>
                            </div>
                        :
                            null
                    }


                </div>
            </div>
        </div>
    }
}
