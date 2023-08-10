import { FeedCard, FeedForm, Title, View } from "@components"

export const FeedPage = () => {
   return (
      <View>
         <Title
            subtitle="What's hot?"
            title="Newsfeed"
         />

         <FeedForm/>
         <FeedCard/>
      </View>
   )
}