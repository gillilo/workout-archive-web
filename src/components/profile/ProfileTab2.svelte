<div class="tab2">
  <div>
    <!-- 가장 많이 한 운동 -->
    <span class="part">Most exercise</span>
    <span class="partData">Bench Press</span>
  </div>
  <div>
    <!-- 가장 적게 한 운동 -->
    <span class="part">Least exercise</span>
    <span class="partData">Squat</span>
  </div>
  <div>
    <!-- 가장 잘 하는 운동 -->
    <span class="part">Best exercise</span>
    <span class="partData">Bench Press</span>
  </div>
  <div>
    <!-- 가장 못 하는 운동 -->
    <span class="part">Worst exercise</span>
    <span class="partData">Overhead Press</span>
  </div>
  <div>
    <!-- 가장 많이 한 부위 -->
    <span class="part">Most part</span>
    <span class="partData">Chest</span>
  </div>
  <div>
    <!-- 가장 적게 한 부위 -->
    <span class="part">Least part</span>
    <span class="partData">Leg</span>
  </div>
  <div>
    <!-- 가장 좋은 부위 -->
    <span class="part">Best part</span>
    <span class="partData">Cheat</span>
  </div>
  <div>
    <!-- 가장 안좋은 부위 -->
    <span class="part">Worst part</span>
    <span class="partData">Back</span>
  </div>

  <div>
    <span class="part">Wilks Point</span>
    <span class="partData">314.23</span>
  </div>
  <div>
    <span class="part">Powerlifting Level</span>
    <span class="partData">Advenced</span>
  </div>
</div>

<style lang="scss">
.tab2 {
  display: flex;
  flex-direction: column;
  background: $color--area;
  color: $color--black;
  padding: 30px;
  width: 300px;
  gap: 30px;
  cursor: default;
  div {
    .part {
      font-size: 1em;
      display: block;
      background-color: $color--primary;
      color: $color--white;
      border-radius: 15px;
      padding-left: 15px;
      padding-top: 1px;
      padding-bottom: 1px;
    }
    .partData {
      padding-top: 5px;
      padding-left: 5px;
    }
    transition: .4s;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>