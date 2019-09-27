import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Component } from 'react';
import { database } from '../firebase/firebase';
import * as utils from '../util/utility';
import axiosInstance from '../axios-orders';
import JobGridFromRD from '../containers/JobGrid/JobGridFromRD';

class recommendation extends Component{
    state = {
        location: "",
        title: "",
    }

    render() {
        return <JobGridFromRD/>;
    }

    componentDidMount(){
        this.getPreference();


        this.getJobFromDescription(this.state.title, this.errorCb)
        .then(res => {
            if (res.length > 0) {
                console.log("pass")
                this.getJobSuccessCb(res);
            } else {
                console.log("not")
            }
        });

 
    }

    getPreference = () => {
        console.log("preference")
        database.ref('/users/' + this.props.userId + '/userinfo/').once('value')
        .then(
            snapchat => {
                this.setState({
                    location : snapchat.val().location,
                    title : snapchat.val().title,
                })
                // this.state.location.setState(snapchat.val().location);
                // // console.log(this.state.location)
                // this.state.title.setState(snapchat.val().title);
                // // console.log(this.state.title)
                
            });
    }

    getJobFromDescription = async (des, errorCb) => {
        // console.log("search")
        try {
            const res = await axiosInstance.get(`positions.json?description=${des}`);
            return res.data;
        }catch (err) {
            console.error(err);
            this.errorCb();
        }
    }

    getJobSuccessCb = (res) => {
        this.setState({
            jobs: res,
            loading: false
        });
        if (this.props.isAuthenticated) {
            // console.log("pass success")
            this.saveJobsIntoDBRecommendation(res);
        } else {
            console.log("didn't success")
        }
    }

    saveJobsIntoDBRecommendation = (jobs) => {
        // console.log('saverecommend');
        jobs.forEach(job => {
        database.ref('/users/' + this.props.userId + '/recommendation/' + job.id).set({
            type: job.type,
            // url: job.how_to_apply.match(/href="(.*?)"/)[1],
            created_at: job.created_at,
            company: job.company,
            location: job.location,
            title: job.title,
            description: job.description,
            company_logo: job.company_logo
        });
    });
}

    errorCb = () => {
        this.setState({
            loading: false,
            error: true
        });
    }
    
}





const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(recommendation);