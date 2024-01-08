const sdk = require('api')('@eden-ai/v2.0#e0ju2clqwki0j8');
require("dotenv").config();
const sdkGen = async (imageText) => {

    try{
        await sdk.auth(process.env.Tkn);
        const data = await sdk.image_generation_create({
            response_as_dict: true,
            attributes_as_list: false,
            show_original_response: false,
            resolution: '512x512',
            num_images: 2,
            providers: 'replicate',
            text: imageText
        })
        
        const res = await data

        return  await res.data.replicate.items[0].image_resource_url;
    }catch(err){
        console.error(err)
    }
}


module.exports = sdkGen;