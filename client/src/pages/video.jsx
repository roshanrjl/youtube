import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/components/ui/card";
import Mycard from "../components/Card";

function Video() {
  return (
    <div className="  flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Left Side (Video Section - 60%) */}
      <Card
        className="h-full w-full rounded-2xl shadow-2xl overflow-hidden
          bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          transition-transform duration-300 hover:shadow-3xl flex flex-col"
      >
        <CardContent className="flex-1  text-gray-700 dark:text-gray-200">
          <Card>
            <CardContent className="flex-1 text-gray-700 dark:text-gray-200">
              {/* Example video placeholder */}
              <div className="w-full h-[60vh] bg-gray-300 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                🎬 Video Player
              </div>
            </CardContent>
            <CardFooter>
              <p>there will be the title of the video Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut perspiciatis nam assumenda rerum vitae. Suscipit, eveniet sequi sit fugit exercitationem obcaecati commodi quisquam dolores illo reprehenderit iusto aliquam accusamus ex porro? Ipsam velit atque natus rem? Et ipsam veniam eius laudantium repellendus aliquid aperiam tempore harum autem nisi provident, nostrum officia corporis soluta. Distinctio recusandae iste necessitatibus optio? Nesciunt iste repellendus dolore dolores modi perferendis aut, sequi dignissimos consequuntur temporibus voluptas, reprehenderit aliquam esse alias quidem accusantium! Sapiente, mollitia eligendi beatae necessitatibus nobis iure debitis earum quam amet molestiae, atque possimus quae fugiat esse assumenda non reiciendis ea sint nam. Delectus dolore dolores, autem ea sed debitis magnam iusto quibusdam ullam odio animi excepturi id aspernatur aliquid esse incidunt rem eos iure labore doloremque corrupti ut cupiditate. Nulla necessitatibus rem molestias aut officia mollitia fugiat, reiciendis dolore vero sequi aliquid illo quasi commodi accusantium odit sit recusandae sunt accusamus nam minima nobis dolores! Quibusdam accusantium nam tempora quidem. Delectus vitae repellendus neque nesciunt, doloremque nulla sint consequatur illum praesentium ullam corporis at! Nemo sequi perspiciatis sed ab quaerat maiores vitae, rerum doloremque ratione quis? Et nam ratione nemo voluptas suscipit non cum soluta maxime harum alias quia numquam officia obcaecati esse nesciunt, provident rerum quis amet adipisci minus velit illum impedit? Et ipsum consequatur nesciunt. Quaerat reiciendis nihil iure quisquam, quo dicta impedit iusto repudiandae blanditiis, quidem eaque quibusdam, facere nesciunt! Eveniet repellat nihil, repudiandae quos rem illum pariatur architecto totam quaerat ullam quia repellendus! Autem blanditiis consectetur suscipit obcaecati placeat. Architecto id voluptatibus sit fuga voluptates nulla facere hic accusantium perspiciatis deserunt? Ipsa, nam cum. Eaque facilis doloremque blanditiis. Vero sequi atque facere voluptate! Tempora reprehenderit voluptates nulla optio eveniet dolore odio deleniti, pariatur praesentium a et! Illum consectetur iste molestiae non eligendi repellat atque natus repudiandae aliquid!</p>
            </CardFooter>
          </Card>
        </CardContent>
        <CardFooter className=" border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {/* Profile & Subscribe */}
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Channel Name
            </span>
            <button className="ml-3 px-4 py-2 rounded-full bg-red-600 text-white text-sm hover:bg-red-700 transition">
              Subscribe
            </button>
          </div>

          {/* Like & Comment */}
          <div className="flex gap-3">
            <button className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              👍 Like
            </button>
            <button className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              💬 Comment
            </button>
          </div>
        </CardFooter>
      </Card>

      {/* Right Side (Mycard - 40%) */}
      <div className="w-[40%] h-[90vh] p-4">
        <Mycard className="h-full w-full"
        
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos et quia ratione officiis nobis sunt ipsa, debitis assumenda recusandae illum commodi vero iste velit accusamus non laborum praesentium, minus quod. Similique possimus qui nesciunt deserunt itaque, nulla sit, magni aut quis quaerat rem ducimus, illum voluptas voluptates explicabo incidunt sed ex corporis provident aliquam quae repudiandae. Tenetur ipsam eaque, quos deleniti iure sapiente. In, deserunt? Numquam deserunt eveniet velit. Voluptate nam mollitia nihil voluptatem, eaque itaque error placeat exercitationem veniam nulla atque reprehenderit a explicabo molestiae amet eum facilis voluptatum non tempora ipsam sed cumque, laborum pariatur. Fuga ut voluptatum dolores, ullam aut praesentium veniam dolor, consequuntur quaerat voluptatem obcaecati sed, dolorem suscipit cupiditate quas asperiores fugit? Sit expedita laudantium dolorum nemo cupiditate, eveniet rerum! Quaerat similique, numquam neque optio soluta eum reiciendis quasi atque aliquam nam facere mollitia quam a asperiores fugiat debitis harum ipsum! Asperiores ducimus nam odio itaque omnis deleniti, illum quo maiores saepe sed blanditiis veritatis quod. Eos modi cupiditate quibusdam a repellat! Iure cumque aut corporis quo reprehenderit! Quae quasi perferendis, est sunt magni maiores iste quia esse nobis quod unde debitis, tempore eius voluptates? At placeat earum deleniti omnis enim fuga blanditiis, labore dolores reiciendis aspernatur quasi porro itaque reprehenderit iusto et ullam laborum nihil quia ipsam accusamus molestiae debitis nemo autem? Praesentium impedit eaque adipisci magnam corrupti quod incidunt mollitia nisi nihil deleniti explicabo, nesciunt, nostrum facere possimus perspiciatis, necessitatibus eveniet. Minus excepturi praesentium, magnam numquam eligendi deserunt iusto. Voluptatem sed eaque eligendi odio labore repellendus facere obcaecati pariatur impedit architecto, nemo doloremque, distinctio, esse iste nulla itaque. Tempore assumenda, quas vitae fugiat fugit facilis nemo dolorem et quasi ad exercitationem, esse qui mollitia ipsum voluptate! A accusantium nihil corporis tempore quidem voluptates quo dolorem dolore. Rerum error quas aperiam libero. Iure."/>
      </div>
    </div>
  );
}

export default Video;

