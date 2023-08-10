import { TextInput, View, Title, Button, FeatureCard, SectionTitle, SquareCard, GridView, ScrollView, ProductCard, CollectionCard } from '@components';
import { IoSearch } from 'react-icons/io5';

export const ManagementView = () => {
   return (
      <View>
         <Title
            subtitle="Sự kiện của bạn !!!"
            title="Quản Lý Sự Kiện"
         />
         <TextInput placeholder="Tìm kiếm" icon={<IoSearch/>}/>

         <Button style={{marginTop: 32}} to="/product/create">Tạo sự kiện</Button>

         <Button style={{marginTop: 32}} to="/product/sale">Create sale events</Button>
      </View>
   )
}