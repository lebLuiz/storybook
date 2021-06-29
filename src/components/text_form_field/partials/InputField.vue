<template>
	<div class="div-input-field">
		<input class="class-input" :type="type"
			@input="sendValue" >

		<i v-if="typeField==='password'"
			class="icon-field-password" 
			@click.prevent="changeType" />
		
	</div>
</template>

<script>

export default {
	name: 'InputField',

	data() {
		return {
			type: null,
		}
	},

	watch: {
		typeField(newV, oldV) {
			if (newV != oldV) this.type = newV;
		}
	},

	mounted() {
		this.type = this.typeField;
	},

	props: {
		typeField: {
			type: String,
			default: "text",
		},
		filterMethod: {
			type: Function,
			required: false,
		},
	},

	methods: {
		changeType() {
			if (this.type === 'password') {
				this.type = 'text'
			} else if (this.type === 'text') {
				this.type = 'password'
			}
		},

		sendValue($e) {
			this.filterMethod($e.target.value);
			this.$emit('valueInput', $e.target.value)
		}
	},

}

</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Montserrat', sans-serif;
  src: url(../../../assets/fonts/Montserrat-Regular.ttf);
}

$maxWidthMobile: 425px;

.div-input-field {
	display: flex;
	width: 100%;
	text-align: center;

	.icon-field-password {
		position: fixed;
		float: right;
		align-self: center;
		left: calc(100% - 80px);
		
		background: #ffffff;
		background-image: url(../../../assets/mostrar.svg);
		background-repeat: no-repeat;
		background-position: right;
		padding-left: 4px;

		width: 24px;
		height: 18px;
	}
}

@media screen and ( max-width: $maxWidthMobile ){
	.div-input-field .icon-field-password {
		right: calc(100% - 95.5%);
		left: auto;
	}
}


.class-input {
  position: relative;
  outline: none;

  width: 100%;
  min-width: $maxWidthMobile;
  height: 44px;

  padding: 8px 24px;

  background: #ffffff;
  box-shadow: 0px 1px 24px rgba(35, 34, 39, 0.1);
  border-radius: 40px;
  border: none;

  // FONT:
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* texto ativado */

  color: #000000;
}

</style>