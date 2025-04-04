# Created a folder for this 
# run 'npm create vite'
# add relevant libraries
# I think we do this from inside the newly created project folder 
# npm install @dnd-kit/core @dnd-kit/sortable
# add tailwind CSS - follow instructions on site @ https://v3.tailwindcss.com/docs/guides/vite
# update the tailwind config js file with stuff on the link and add background options 
# now delete everything on the app.css and index.css 
# npm install tailwind-merge
# run npm
# npm run dev 
# we see that everything is working as expected
# lets apply some styling to our app.css file with help of tailwind 
# update file with some things like bg-black

# now we want to create the KanbanBoard.tsx file 
# and apply some base styles 
# type rfce, hit enter to create function boilerplate, and remove the first two lines, and add some basic style 


# note if you accidentally create it like I did with the lowercase t 
# run the dev server and try and delete and re-create with a capital letter 
# you might run into some fucking javascript bullshit 
# this is whree its nice to knwo that you can go ahead and do the following 
# thanks to this guy ->  https://sentry.io/answers/how-do-i-resolve-cannot-find-module-error-using-node-js/
# rm -rf the node_modules folder
# rm -f the package lock.json
# npm cache clean --force 
# and re-run npm install 

# now we want to create the icons folder and rfce create a icon for the plus sign 
# grab it from here > https://heroicons.com/ and search plus and copy  
# now we can replace the div created by rfce with what was copied to our clipboard
# and add that + icon component that we stored in the icons folder under resources 
# to the kanban KanbanBoard

# add flex and a gap to the button component
# and beneath the kanbanbaord component we want to create a function we can use to create a new column 
# we will need to add an onclick event to the button we have in the KanbanBoard class 
# however now we need somewhere to storethe new columns

# we will store them in this 
# const [columns, setColumns] = useState([]);
# for this we need to import the 


# now we create a type for our column so create a types.ts file in src
# our column will consist of an ID and a title, the ID will either be a string or a number
# we now define our state as of type column and import the required types 

# now that we have some of this crap setup we can implement 
# drag and drop functionality 
# we need to utilize the dnd-kit 
# start by importing the appropriate context on the kanbanboard tsx file 
# -> import { DndContext } from "@dnd-kit/core"; 

# we should also consider the fact that we want to be able to sort 
# so lets wrap our column container array in a sortable context 

