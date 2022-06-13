import { CategoryTS } from './../types/types';
import { loremIpsum, LoremIpsum } from 'lorem-ipsum'

const lozenIpdesk = {
   title: new LoremIpsum({
      wordsPerSentence: {
         min: 2,
         max: 5
      },

   }),
   body: new LoremIpsum({
      wordsPerSentence: {
         min: 14,
         max: 28
      },
      sentencesPerParagraph: {
         min: 4,
         max: 8
      },
   }),
}

export const randomCategory: CategoryTS = {
   description: lozenIpdesk.title.generateSentences(2),
   locale: 'pt-br',
   name: loremIpsum({
      count: 5,
      units: 'words'
   }),
   position: 0,
}