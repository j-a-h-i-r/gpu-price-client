import { AutoComplete, Button, Flex, Input, Modal, Radio, Switch, Table } from "antd"

export function ModelList(props: any) {
    const {
        gpus, columns, selectedGpus, rowSelection,
        onFilterChange, gpuFilter, onClickModelBtn,
        isModelModalOpen, onClickCancel, onClickOk,
        modelInput, onChangeModelInput, modelOptions,
        modelInputFilter, isModelSelectedFromList, onSelectModelInput,

    } = props;
    return <div>
        {
            selectedGpus && selectedGpus.length > 0 && 
            <>
            <p>
                {selectedGpus.length} GPUs selected
            </p>
            <div>
                <Button onClick={onClickModelBtn}>
                    Associate Model
                </Button>
            </div>

            <Modal
                open={isModelModalOpen}
                onCancel={onClickCancel}
                onOk={onClickOk}
            >
                <p>Associate a Model with these GPUs</p>
                <Flex vertical>
                    <AutoComplete
                        placeholder="Model name"
                        options={modelOptions}
                        onChange={onChangeModelInput}
                        filterOption={modelInputFilter}
                        onSelect={onSelectModelInput}
                    />

                    {!isModelSelectedFromList &&
                        <div>
                            The GPUs will be associated with a new model
                        </div>
                    }
                </Flex>
                
            </Modal>
            </>
        }

        <div>
            <Flex>
                <Input.Search
                    placeholder="Enter GPU to filter"
                    onSearch={onFilterChange}
                    // value={gpuFilter}
                />
            </Flex>
        </div>


        <Table
            rowSelection={rowSelection}
            dataSource={gpus} columns={columns}
            rowKey={(record) => record.gpuid}
        />
    </div>
}