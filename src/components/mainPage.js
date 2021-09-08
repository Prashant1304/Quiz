import React,{Component} from "react"
import data from "./data"
import Data from "./data"

import "./mainPage.css"

class MainPage extends React.Component {    
    constructor(props) {
        super(props)
        
        this.toggle = {
            questions:"questions",
            answerCount:"answerCount"
        }
        
        this.state = {
            Data:Data,
            count:1,
            answer:"",
            value:"",
            right:0,
            current:this.toggle.questions,
        }

        
        this.handleButton = this.handleButton.bind(this)
        this.handleTarget = this.handleTarget.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    componentDidMount() {
       var filterr =  this.state.Data.filter((x) => {
        return x===data[0]
    })
    this.setState({Data:filterr})
    // console.log(this.state.Data)
    }

   
    handleButton(e) {

        ////////// this will increase the count when button click for filter data //////
        if(this.state.count<10) {
            this.setState({count:this.state.count+1})
        }

        var filterr =  Data.filter((x) => {
            //    console.log(x.ans)
            return x==data[this.state.count]
        })

        ////////// below logic will increment value if the answer is right and empty value ////////// 
        if(this.state.answer === this.state.value && this.state.value !==""){
            this.setState({right:this.state.right+1})
            this.setState({value:""})
            console.log("pras")
        }

        ////// this will toggle between correct answer count and questions //////////
        if(this.state.count === 10) {
            this.setState({current:this.toggle.answerCount})
        }

        ///// alert if ans is not right ////
        if(this.state.answer !== this.state.value) {
            alert(`wrong! the correct answer is ${this.state.answer}`)
        }

        this.setState({Data:filterr})
        // console.log(this.state.count,this.state.Data,this.state.value) 
    }


    ////// this handler will extract value from options and set the correct answer from main data and change colour based on right or wrong//////
    handleTarget(e) {
        let target = e.target.value
        this.state.value=target
        this.state.answer=this.state.Data[0].ans
        if(this.state.value === this.state.answer) {
            e.target.style.color = "green"
            setTimeout(() => {
                e.target.style.color = "white"
            }, 1000);
                    
                } else if(this.state.value !== this.state.answer) {
                    e.target.style.color = "red"
                    setTimeout(() => {
                    e.target.style.color = "white"
                    }, 2000);
                }

    }

    // handleTarget2(e) {
    //     console.log(e)
    //     
    // }

    handleReset(e) {
        window.location.reload();
    }
    
    render() {
        console.log(this.state.value,this.state.answer,this.state.right,this.state.count)
        return(
            <div className="Q-main" >
              {this.state.current===this.toggle.questions &&  
                <div>
                    {this.state.Data.map((x,y) => {
                        return <div key={y}>
                           <p className="Q-question"  > {x.question} </p>

                           {x.options.map(z => {
                            //    console.log(z)
                               return <div>
                                    <li >
                                        <button style={{border:"none",backgroundColor:"blueviolet",fontSize:"21px",color:"white"}}  value={z} onClick={this.handleTarget}> {z} </button>   
                                    </li>
                                </div>
                            })}

                        </div>
                    })}
                    <div className="Q-next" >
                        <button className="Q-next-butt" onClick={this.handleButton}>Next</button>
                    </div>
                </div>}

                {this.state.current === this.toggle.answerCount&& <div>
                   <p> the correct answer count is {this.state.right} </p>
                   <button onClick={this.handleReset}>Reset</button>
                </div>}
            </div>
        )
    }
}

export default MainPage