import React, { Component } from 'react';
import Chart from 'chart.js';

class LaunchesPerYear extends Component {
    state = {}

    componentDidMount() {
        const launch_year = this.props.launches.map(launch => launch.launch_year);
        
        let launch_year_unique = [];
        for (let i = Math.min(...launch_year); i <= Math.max(...launch_year); i++){
            launch_year_unique.push(i.toString());
        }

        let data_upcoming = new Array(launch_year_unique.length).fill(0);
        let data_success = new Array(launch_year_unique.length).fill(0);
        let data_failure = new Array(launch_year_unique.length).fill(0);

        this.props.launches.forEach((launch) => {
            if (launch.upcoming) {
                data_upcoming[launch_year_unique.indexOf(launch.launch_year)]++;
            } else if (launch.launch_success) {
                data_success[launch_year_unique.indexOf(launch.launch_year)]++;
            } else {
                data_failure[launch_year_unique.indexOf(launch.launch_year)]++;
            }
        });

        new Chart(document.getElementById('chart-launches-per-year').getContext('2d'), {
            type: 'bar',
            data: {
                labels: launch_year_unique,
                datasets: [{
                    label: 'Success',
                    stack: 'Stack 0',
                    backgroundColor: 'rgba(105, 240, 174, 0.6)',
                    borderColor: 'rgba(105, 240, 174, 1)',
                    borderWidth: '2',
                    data: data_success
                },
                {
                    label: 'Failure',
                    stack: 'Stack 0',
                    backgroundColor: 'rgba(229, 115, 115, 0.6)',
                    borderColor: 'rgba(229, 115, 115, 1)',
                    borderWidth: '2',
                    data: data_failure
                },
                {
                    label: 'Upcoming',
                    stack: 'Stack 0',
                    backgroundColor: 'rgba(240, 173, 78, 0.6)',
                    borderColor: 'rgba(240, 173, 78, 1)',
                    borderWidth: '2',
                    data: data_upcoming
                }
                ]
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                responsive: true
            }
        });
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-0 col-lg-2"></div>
                        <div className="col-12 col-lg-8">
                            <h4 className="card-title text-center">Launches Per Year</h4>
                            <canvas id="chart-launches-per-year"></canvas>
                        </div>
                        <div className="col-0 col-lg-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LaunchesPerYear;