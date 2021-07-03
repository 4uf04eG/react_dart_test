import React from "react";

import 'chartjs-plugin-zoom';
import {Scatter} from "react-chartjs-2";
import {Box, Grid, Slider} from "@material-ui/core";
import {Params} from "./FunctionsList";
import {lightBlue} from "@material-ui/core/colors";

const validate = (p: Params) => !Number.isNaN(p.a) && !Number.isNaN(p.b) && !Number.isNaN(p.c);
const compute = (x: number, a: number, b: number, c: number) => a * x * Math.cos(b * x ** 2) + c;
const labels = Array.from(Array(400).keys()).map(x => (x - 200) / 10);

interface Bound {
    min: number,
    max: number
}

interface State {
    xBound: Bound,
    yBound: Bound
    data: Array<Params>
}

class Chart extends React.Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            xBound: {min: -10, max: 10},
            yBound: {min: -200, max: 200},
            data: []
        }
    }

    updateParams = (params: Array<Params>) => {
        this.setState({data: params});
    }

    zoomX = (event: any, scale: any) => {
        const scaleFactor = -0.1;
        scale = (100 - scale);
        this.setState({
            xBound: {
                min: scaleFactor * (scale),
                max: scaleFactor * (1 - scale)
            }
        })
    }

    zoomY = (event: any, scale: any) => {
        const scaleFactor = 2;
        this.setState({
            yBound: {
                min: scaleFactor * scale,
                max: scaleFactor * (1 - scale)
            }
        })
    }

    render() {
        const options = {
            scales: {
                xAxes: [{
                    ticks: {
                        min: this.state.xBound.min,
                        max: this.state.xBound.max
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: this.state.yBound.min,
                        max: this.state.yBound.max
                    }
                }],
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy'
                    },
                    zoom: {
                        enabled: true,
                        mode: 'xy',
                    }
                }
            },
        }
        const datasets = {
            labels: labels,
            datasets: this.state.data.filter(d => validate(d)).map((d: Params) =>
                ({
                    label: `y = ${d.a} * x * cos(${d.b} * x ^ 2) + ${d.c}`,
                    backgroundColor: `rgba(${d.color.r}, ${d.color.g}, ${d.color.b}, ${d.color.a})`,
                    data: labels.map(l => ({x: l, y: compute(l, d.a, d.b, d.c)}))
                })
            )
        }

        return <Box border={1}
                    borderColor={lightBlue[800]}
                    borderRadius={4}
                    paddingLeft={3}
                    paddingRight={5}
                    paddingTop={3}
                    paddingBottom={2}>
            <Grid container>
                <Box display={"flex"} width="100%">
                    <Scatter data={datasets} options={options}/>
                    <Slider orientation="vertical" onChange={this.zoomY}/>
                </Box>
                <Slider track="inverted" onChange={this.zoomX}/>
            </Grid>
        </Box>
    }
}

export default Chart