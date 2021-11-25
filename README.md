# Dialog Engine

This project is my experimentation in implementing a game engine logic tree as I remember seeing it in the Oblivion World Construction Kit.  I did not go back and look at the actual implementation.  Having seen it years ago, and grasping the concept, I have decided to implement something like that as my first exercise in developing something with React.

## App
The place where it all comes together.  This is the primary handler to "react" to everything happening in the UI and to help manage the gamestate caused by this interactive input.  It is also where the specific logic tree for a game is loaded.  The sample here loads up 'Business of Murder'.

## BusinessMurder
The overall DialogEngine logic is intended to be reusable--supporting different games, game logic, and conversations.  The BusinessMurder.js file is the first sample representation of a game logic table.

## The 'logic' table
The 'logic' table provides the logic tree as remembered from Oblivion.  Each row in the logic table represents a possible logic state in the game.  During each loop of the game engine the rows are evaluated from top-to-bottom evaluating each colum from left-to-right.

All the column values are optional.  An unset/ignored value must be set to be an empty string "".  They should never be null.

| Col | Name | Description |
| --- | ------- | ----------- |
| w | World     | Name of the world we might be in |
| z | Zone      | Name of the zone we might be in  |
| n | NPC       | Name of an NPC we might be engaging |
| t | Trigger   | Name of a current state or trigger |
| c | Checks    | Array of property values -- all must be true |
| e | Environ   | Dialog/Text for the environment |
| i | InDialog  | Dialog/Text/Narration to the player |
| o | OutDialog | Dialog/Text/Options from the player |
| a | Actions   | Resulting game state changes when row |

The first 5 columns are used to determine the current game state.  From left-to-right, each column value must be empty ("") or match the current game state to be considered 'true'.  Subsequent columns are only evaluated as long as the previous column was 'true'.  As soon as a column value is found to be **false**, that row is considered "no match" and we move on to evaluate subsequent rows until we find the row that matches the current game state.

Conceptually, the earlier in the game you are, likely the further down the table is the match.  As more of the game is completed, the higher up we usually find the matched row in the table.

# The Dynamics of Dynamic Dialog

Independent of the game logic tree, is an attempt to make a sophisticated dynamic dialog engine intended to deliver a richer dialog experience.  

This starts with providing a large array of root words and a list of synonyms in a **SynonymMap**.  There is a mechanism to spread the use of those word synonyms out over time.  

Templates of messages--which might be whole sentences or snippets of sentences--are defined with references to synonyms in the **MessageMap**.  Just prior to display, the message template is processed and the synonym placeholders are replaced dynamically.  This makes that message different each time it is used.  The more synonyms available, the more unique each message can be each time it is used.

These messages can be grouped together in a **RandomMessageMap**.  Here we define an array of related messages that can be randomly chosen to satisfy a particular message.  Instead of always displaying the same message, the game can choose from N number of related messages--all of which are dynamically generated from templates as described above.

Additionally, messages can be chained together in the **ChainedMessageMap**.  This is helpful when a longer dialog is needed to convey more information.  The chained messages can also take advantage of using the random message map.  So a N message monologue can actually be made from N random but related messages stringed together making the whole monologue unique each time it is seen.

Key to this is that any given message can be made of of any number of message snippets, random messages, chained messages, or well-placed synonyms.  The richness is only limited by the amount of dialog data the game designer wants to provide.

# LocationInfo

This file is where the game world is described.  What all the rooms or zones or locations might be. How they all might be connected together.  What people might be where.