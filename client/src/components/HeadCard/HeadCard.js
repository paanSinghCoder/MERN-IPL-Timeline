import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import './HeadCard.css';
import 'antd/dist/antd.css';

const HeadCard = () => {
    return(

        // <Card className="head-card">
        //     {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
        //     <CardBody>
        //       <CardTitle>Welcome to IPL matches</CardTitle>
        //       {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
        //       <CardText>This map will show you year wise IPL matches played in different stadiums on India.<br /> Just click on a marker on map to know more or slide the timeline slider on right.</CardText>
        //       <Button>Button</Button>
        //     </CardBody>
        //   </Card>
        <Card 
        id="head-card" 
        title="Welcome to IPL Timeline" 
        bordered={false} 
        style={{ width: 300 }} 
        cover={<img alt="example" src={ require('../../img/static-cover.jpg')} />}
        actions={[
            <Tooltip placement="bottom" title="About"><Icon type="bulb" /></Tooltip>, 
            <Tooltip placement="bottom" title="Fork on GitHub"><a href='https://github.com/gaurav3017' target='_blank' rel="noopener noreferrer"><Icon type="github" /></a></Tooltip>,
            <Tooltip placement="bottom" title="Find me on LinkedIn"><a href='https://www.linkedin.com/in/gaurav-singh-90551275/' target='_blank' rel="noopener noreferrer"><Icon type="linkedin" /></a></Tooltip>
        ]}>
          <p>This map will show you year wise IPL matches played in different stadiums on India.<br /> 
          Just click on a marker on map to know more or slide the timeline slider on right.</p>
        </Card>
    );
}

export default HeadCard;