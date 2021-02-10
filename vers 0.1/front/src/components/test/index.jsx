import React from 'react'
import CssCarousel from '../template/common/css-carousel'
import './style.scss'

class TestingGround extends React.Component{

    render(){
        const items = [
            {id: "item1", title: "Item 1", text: "some text 1"},
            {id: "item2", title: "Item 2", text: "some text 2"},
            {id: "item3", title: "Item 3", text: "some text 3"},
            {id: "item4", title: "Item 4", text: "some text 4"},
            {id: "item5", title: "Item 5", text: "some text 5"},
            {id: "item6", title: "Item 6", text: "some text 6"},
        ]
        return(
        <>
            <CssCarousel
            useJs
            // items={items}
            >
                {
                    items.map(i=>
                    <div className="flex column align-items-center justify-stretch bg-light-gray">
                        <h3>
                        {i.title}
                        </h3>
                        <p>{i.text}</p>
                    </div>
                    )
                }
                
                {/* {items.map(i => <div className="flex column align-items-center justify-stretch">
                    <h3>
                        {i.title}
                    </h3>
                    <p>{i.text}</p>
                    </div>)} */}
            </CssCarousel>
        </>)
    }
}

export default TestingGround