import axios from 'axios';  
import { getSession } from 'next-auth/client';  
  
export default async (req, res) => {  
  const session = await getSession({ req });  
  if (!session) {  
    res.status(401).json({ error: 'Unauthorized' });  
    return;  
  }  
  
  const { content } = req.body;  
  
  try {  
    const response = await axios.post(  
      `https://api.linkedin.com/v2/ugcPosts`,  
      {  
        author: `urn:li:person:${session.user.id}`,  
        lifecycleState: 'PUBLISHED',  
        specificContent: {  
          'com.linkedin.ugc.ShareContent': {  
            shareCommentary: {  
              text: content,  
            },  
            shareMediaCategory: 'NONE',  
          },  
        },  
        visibility: {  
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',  
        },  
      },  
      {  
        headers: {  
          Authorization: `Bearer ${session.accessToken}`,  
        },  
      }  
    );  
    res.status(200).json(response.data);  
  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  
