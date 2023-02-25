import Button from '@mui/material/Button'
interface props{
    title:string
    onClick:()=>void
    width:string
    height:string
}
const PrimaryButton = ({title,onClick,width,height}:props) => {
  return (
    <Button 
        variant="contained" 
        sx={{
            color:'white', 
            backgroundColor:'black',
            paddingLeft:5,
            paddingRight:5,
            width:width,
            height:height
        }} onClick={onClick}>
            {title}
    </Button>
    )
}

export default PrimaryButton