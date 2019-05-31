import React, {Component} from "react";
import { Link } from 'react-router-dom'
import MainMenu from "../components/MainMenu.jsx";
import Footer from "../components/shared/footer/footer";
import _ from "lodash";
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid'
import { useTranslation, Trans } from "react-i18next";
import { raceActions } from '../actions/race';
import { reunionActions } from '../actions/reunion';
import Countdown from 'react-countdown-now';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Race from "../components/Race";
const { t, i18n } = useTranslation();

export default class NewsPage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            lang: this.props.match.params.lang,
        };
    }

    async componentWillMount() {

    }

	render() {

		return <div>
            <header>
                <MainMenu {...this.state}/>
            </header>

            <div className="container-fluid">
                <div id="wrapper">
                    <div id="main">
                        <p>NEWS TOTO WITH PHILIPPE</p>
                    </div>
                </div>
            </div>
            <Footer />
		</div>;
	}
}
