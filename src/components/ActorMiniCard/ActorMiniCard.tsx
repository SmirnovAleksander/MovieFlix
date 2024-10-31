import {Avatar, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import {StaffMembers} from "../../app/ApiTypes/StaffMembersApi.types.ts";

interface ActorMiniCardProps {
    actorsStuff: StaffMembers
}
const ActorMiniCard: React.FC<ActorMiniCardProps> = ({actorsStuff}) => {
    return (
        <>
            {actorsStuff?.slice(0, 20).map(({ nameRu, staffId, posterUrl, description}) => (
                nameRu && (
                    <Link component={RouterLink} to={`/actor/${staffId}`} key={nameRu} sx={{textDecoration: 'none'}}>
                        <Card  sx={{ display: 'flex'}}>
                            <CardActionArea sx={{flexDirection: 'row', display: 'flex', padding: '5px 8px', justifyContent: 'space-between'}}>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '0 5px'}}>
                                    <Typography variant="body1" sx={{ flexGrow: 1}}>
                                        {nameRu}
                                    </Typography>
                                    <Typography variant="body1" color='info' sx={{ flexGrow: 1 }}>
                                        {description && description.length > 25 ? `${description.slice(0, 20)}...` : description || ''}
                                    </Typography>
                                </CardContent>
                                <Avatar
                                    alt="Remy Sharp"
                                    src={posterUrl}
                                    sx={{ width: 70, height: 70}}
                                />
                            </CardActionArea>
                        </Card>
                    </Link>
                )
            ))}
        </>
    );
};

export default ActorMiniCard;