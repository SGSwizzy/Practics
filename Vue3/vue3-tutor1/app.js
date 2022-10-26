Vue.createApp({
    data() {
        return {
            placeholderString: 'Введите заметку',
            title: 'Список заметок',
            inputValue: '',
            notes: ['Заметка 1', 'Заметка 2']
        }
    },
    methods: {
        // inputChangeHandler(event) {
        //     this.inputValue = event.target.value;
        // },
        addNewNote() {
            if (this.inputValue !== '') {
                this.notes.push(this.inputValue);
                this.inputValue = '';
            }
        },
        toUpperCase(item) {
            return item.toUpperCase();
        },
        // inputKeyPress(event) {
        //     if (event.key === 'Enter') {
        //         this.addNewNote()
        //     }
        // }
        removeNote(index) {
            this.notes.splice(index, 1);
        }
    },
    computed: {
        doubleCountComputed() {
            console.log('doubleCountComputed');
            return this.notes.length * 2;
        }
    },
    watch: {
        // inputValue(value) {
        //     if (value.length > 10) {
        //         this.inputValue = '';
        //     }
        //     console.log('input Value Change', value)
        // }
    }
}).mount('#app')