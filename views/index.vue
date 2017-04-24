<template lang="html">
    <div>
        <h1>{{title}}</h1>
        <label>I want</label><input type="number" name="choose_number" min="1" max="10" v-model="numberQuestions"><label>questions</label>
        <br>
        <br>
        <button type="button" name="show_questions" v-if="!show" v-on:click="showQuestions">show Quesions</button>
        <button type="button" name="show_more_questions" v-else v-on:click="showQuestions">show another set of questions</button>
        <questions v-if="show" :questions="questions" :reset="reset" v-on:add-point="totalAddPoints" v-on:reset-request="resetParam"></questions>
        <h2>Total points: {{points}}</h2>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
          show: false,
          numberQuestions: 1,
          questions: [],
          points: 0,
          reset: false
        }
    },
    methods: {
        showQuestions: function(){
          this.show = true;
          this.reset = true;
          $.getJSON(`https://opentdb.com/api.php?amount=${this.numberQuestions}&category=9&difficulty=easy&type=multiple`)
           .done((data) => {
             for(var i=0;i<data.results.length;i++){
               data.results[i].id = i;
             }
             this.questions=data.results;
           })
        },
        totalAddPoints: function(){
          this.reset=false;
          this.points+=1;
        },
        resetParam: function(){
          this.reset=false;
        }
    }
}
</script>

<style lang="css">
</style>
