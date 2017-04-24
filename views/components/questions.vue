<template lang="html">
  <div class="questions">
      <question v-for="question in questions" :question="question" :reset="reset" v-on:answer-correct="addPoint" v-on:answer-incorrect="resetRequest"></question>
      <h2>You earned {{oneRoundPoints}} points in this round.</h2>
  </div>
</template>

<script>

export default {
    data: function(){
      return {
        oneRoundPoints: 0
      }
    },
    updated: function(){
      if(this.reset === true){
        this.oneRoundPoints=0;
      }
    },
    props: ['questions', "reset"],
    components: ["question"],
    methods: {
      addPoint: function(){
        this.oneRoundPoints +=1;
        this.$emit("add-point")
      },
      resetRequest: function(){
        this.$emit("reset-request")
      }
    }
}
</script>

<style lang="css">
</style>
