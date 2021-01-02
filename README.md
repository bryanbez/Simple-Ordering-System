About Computed Property to Update
yung _value need para ifetch ang data ng bawat column
nung una, sa backend ako naglalagay ng _value bawat column 
pero ilagay nalang sa axios update query nalang para di paulit-ulit yung _value sa backend 
ex:  axios.put(`http://127.0.0.1:8000/api/voucher/${singleVoucher._value['voucher_id']}`, singleVoucher._value)
