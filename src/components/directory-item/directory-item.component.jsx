import { DirectoryItemContainer, BackgroundImage, Body} from './directory-item.styles';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {
    const {title, imageUrl, route} = category;

    const navigate = useNavigate();
    const handleOnNavigate = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={handleOnNavigate}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem