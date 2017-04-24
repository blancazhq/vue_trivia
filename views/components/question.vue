<template lang="html">
  <div class="question">
      <h3 v-html="question.question"></h3>
      <div id="question_div">
        <button v-for="(answerbutton, i) in answerbuttons" :class="{current: isCurrent}" v-html="answerbuttons[i].html" v-on:click="answerbuttons[i].onClick"></button>
      </div>
      <p>{{result}}</p>
  </div>
</template>

<script>
export default {
    data: function(){
      return {
        result: "",
        isCurrent: false
      }
    },
    computed: {
      answerbuttons: function(){
        function shuffle(a) {
            for (let i = a.length; i; i--) {
                let j = Math.floor(Math.random() * i);
                [a[i - 1], a[j]] = [a[j], a[i - 1]];
            }
        }
        var array = [{
          html:this.question.correct_answer,
          onClick: this.answerCorrect
        },
        {
          html:this.question.incorrect_answers[0],
          onClick: this.answerIncorrect
        },
        {
          html:this.question.incorrect_answers[1],
          onClick: this.answerIncorrect
        },
        {
          html:this.question.incorrect_answers[2],
          onClick: this.answerIncorrect
        }]
        shuffle(array)
        return array
      }
    },
    updated: function(){
      if(this.reset === true){
        this.result= "";
        this.isCurrent=false;
        setTimeout(function(){
          $("button").prop("disabled", false);
        }, 1)
      }
    },
    props: ['question', "reset"],
    methods: {
      answerCorrect: function(){
        this.result="You nailed it!";
        this.isCurrent=true;
        setTimeout(function(){
          $(".current").prop("disabled", true);
        }, 1)
        this.$emit("answer-correct");
      },
      answerIncorrect: function(){
        this.isCurrent=true;
        setTimeout(function(){
          $(".current").prop("disabled", true);
        }, 1)
        this.result="Sorry, wrong answer";
        this.$emit("answer-incorrect");
      }
    }
}
</script>

<style lang="css">
.current{
  pointer-events: none;
}
</style>
