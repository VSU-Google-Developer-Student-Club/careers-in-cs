import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Grid, Typography, Box, Modal, Button, Divider,Accordion,AccordionDetails,AccordionSummary,Paper, TextField,AppBar,Toolbar} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {roles} from './rolesData';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ExpandMore from '@mui/icons-material/ExpandMore';
import QRCode from 'react-qr-code';
import CircularProgress from '@mui/material/CircularProgress';
// Flutter, React Native, 


const jobTitles = [
  "Mobile Development",
  "Security Analysis",
  "Frontend Development",
  "Backend Development",
  "Game Design",
  "Full Stack Development",
  "Graphics Programming",
  "Security Analysis",
  "Ethical Hacking",
  "Penetration Testing",
  "Computer Vision",
  "Natural Language Processing",
  "Reinforcement Learning",
  "IT Consulting",
  "Project Management",
  "Scrum",
  "Solutions Architect",
  "Blockchain",
  "Quantitative Analysis"
]

const themeOptions ={
  palette: {
    mode:'dark',
    type: 'dark',
    primary: {
      main: '#d26410',
    },
    secondary: {
      main: '#8794e0',
    },
    resize:{
      fontSize:50
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Target the input element for font size
          '& .MuiInputBase-input': {
            fontSize: '20px',
          },
          // Target the label for font size
          '& .MuiInputLabel-root': {
            fontSize: '20px',
          },
        },
      },
    },
  },
};



function MoreInformationModal(props)
{
  React.useEffect(()=>
  {
    props.setContent([])
  },[])
  
  const loadAiContent = async () =>
  {
    setAiCall(<CircularProgress/>)
    await new Promise(resolve => setTimeout(resolve,1000))
    //Set time delay to simulate loading
    
    props.setContent(
      [
        {
          name: "ChatGPT",
          description: "ChatGPT is a language model that can be used to generate text"
        },
        {
          name: "Image Recognition",
          description: "Use Computer Vision to recognize objects in images"
        },
        {
          name: "Natural Language Processing",
          description: "Use Natural Language Processing to understand and generate text"
        }
      ]
    )
    setAiCall(<AIButton/>)
  }
  const AIButton = () =>
  {
    return(
      <Button onClick = {loadAiContent}>
        <Typography variant="h6">Learn From ChatGPT what you can make</Typography>
      </Button>
    )
  }
  const [aiCall,setAiCall] = React.useState(<AIButton/>)
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper p={5} elevation={5} sx ={{
        position: 'absolute',
        width: "50%",
        maxHeight: "70%", // Maximum height of the Paper component
        overflow: "auto", // Enables scrolling for overflow content
        backgroundColor: "#424242",
        borderRadius: 4,
        border: `2px solid ${themeOptions.palette.secondary.main}`,
        boxShadow: 24,
        p: 10,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h4" component="h2">
          What can you do with {props.title}?
        </Typography>
        <Divider color="secondary" sx={{width:"100%"}}/>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <br/>
            <Typography variant="h4">Use Cases</Typography>
            <Divider color="orange" sx={{width:"100%"}}/>
          </Grid>
          <Grid item xs={12}>
            {
              props.content.length===0 ? aiCall : props.content.map((useCase,index)=>
              {
                return(
                  <Typography variant="h5">{useCase.name} - {useCase.description}</Typography>
                )
              })
            }
          </Grid>
          <Grid item xs={12}>
            <br/>
            <br/>
            <Typography variant="h4">External Resources</Typography>
            <Divider color="orange" sx={{width:"100%"}}/>
          </Grid>
          <Grid item xs={12}>
            {props.links.map((link,index)=>
            {
              return(
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{link.purpose}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <QRCode size={128} value={link.hyperlink}/>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
}

function App() {
  const [title,setTitle] = React.useState("");
  const [links,setLinks] = React.useState([{}]);
  const [content,setContent] = React.useState(
    [
    ]
  )
  const [loading,setLoading ] = React.useState(false);
  const [search,setSearch] = React.useState("");
  const [open,setOpen] = React.useState(false);
  const handleClose = () =>{
    setContent([])
    setOpen(false);
  }
  const theme = createTheme(themeOptions)
  return (
    <ThemeProvider theme={theme}>
    <MoreInformationModal content={content} setContent={setContent} links = {links} title={title} open={open} onClose={handleClose}/>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ }}>
          Careers in Computer Science
        </Typography>
      </Toolbar>
    </AppBar>
    <Paper sx={{width:"100%", height:"200vh"}}>
      <Grid container spacing = {2}>
        {roles.map((role,index)=>
        {return(
          <Grid item xs={12}>
          <Accordion sx={{backgroundColor:"#424242"}}>
            <AccordionSummary expandIcon={<ExpandMore/>}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">{role.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider color="orange" sx={{ width: "100%" }} orientation="horizontal"/>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Button onClick={()=>
                {
                  setOpen(true)
                  console.log(role.links)
                  setLinks(role.links)
                  setTitle(role.title)
                  }}>
                <Typography variant="h6">What can you make with {role.title}?</Typography>
              </Button>
              
            </AccordionDetails>
          </Accordion>
        </Grid>
        )
        })}
      </Grid>
    <footer>Created by Isaiah Freeman</footer>
    </Paper>
    </ThemeProvider>
  );
}

export default App;
